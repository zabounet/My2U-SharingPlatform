import UserModel from '../models/utilisateurs.model';
import uniqid from '../utils/RandomId';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import argon2 from "argon2";
import dotenv from "dotenv"
import mongoose from 'mongoose';
dotenv.config()

//TODO : Ajouter subjects au params
async function sendEmail(email: string, body: string): Promise<any> {
    // Use .env for these
    const ID = process.env.CLIENT_ID
    const SECRET = process.env.CLIENT_SECRET
    const REFRESH = process.env.REFRESH_TOKEN
    const SENDEREMAIL = process.env.EMAIL

    const oAuth2Client = new google.auth.OAuth2(
        ID,
        SECRET,
        'http://localhost:8081' //<--- redirect URL
    );
      
      // Définir le jeton d'accès pour le client OAuth2
    oAuth2Client.setCredentials({
        refresh_token: REFRESH
    });

    const accessToken = await oAuth2Client.getAccessToken()

    const transporterOptions = {
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDEREMAIL,
            clientId: ID,
            clientSecret: SECRET,
            refreshToken: REFRESH,
            accessToken: accessToken
        }
    };

    // Merci Copilot de finalement fonctionner après avoir litéralement tout desinstallé et réinstallé
    const transporter = nodemailer.createTransport(transporterOptions as any, {})

    transporter.sendMail({
        from: SENDEREMAIL,
        to: email,
        subject: 'Reset Password',
        text: body
    }, (err, info) => {
        console.log(email);
        if(err) {
            console.log(err)
        } else {
            console.log(info)
        }
    }
    )
}

// TODO: ajouter les vérifications pour les requêtes
export const GetUtilisateurs = async (req: any, res: any): Promise<void> => {
    const post = await UserModel.find({Banned: false}).select('-MotDePasse, -Email')
    res.status(200).json(post)
}

export const CheckUtilisateurLogins = async (req: any, res: any): Promise<void> => {

    const post = await UserModel.findOne({ Email: req.body.Email })

    if(post && post !== null){
        // Utilisateur banni
        if(post.Banned) {
            // TODO : Ajouter un message pour dire que l'utilisateur est banni
            res.status(400).json({message: "Votre compte a été banni"})
            return
        }
            // Sinon on vérifie le mot de passe
            else {
                
                if (await argon2.verify(post.MotDePasse, req.body.MotDePasse)){
                    
                    req.session.sessionInfos = post
                    req.session.save();
                    res.status(200).json({loggedIn: true, infos: post, userId: req.session})
                    return
                } else {
                    res.status(301).json({message: "Email not found or wrong password"})
                    return
                }
            }
    } else {
        res.status(301).json({message: "Email not found or wrong password"})
    }
}

export const GetUtilisateurById = async (req: any, res: any): Promise<void> => {
    if(!req.session.sessionInfos) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
    
    const post = await UserModel.findOne({_id:req.session.sessionInfos._id, Banned: false}).select('-MotDePasse -Email')
    req.session.sessionInfos = post
    req.session.save()

    res.status(200).json({loggedIn: true, infos: post, userId: req.session.sessionInfos})
}

export const GetUtilisateurByGivenId = async (req: any, res: any): Promise<void> => {
    if(!req.session.sessionInfos) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }

    let FetchedUsers: Array<any> = []

    if(req.body.length) {
        for (let i = 0; i < req.body.length; i++) {
            req.body[i].Utilisateurs.forEach((element: any) => {
                if(!FetchedUsers.includes(element._id) && element._id !== req.session.sessionInfos._id) {
                    FetchedUsers.push(element._id)
                }
            })
        }
        const post = await UserModel.find({_id: { $in: FetchedUsers } }).select('-MotDePasse -Email')
        res.status(200).json({loggedIn: true, infos: post, userId: req.session.sessionInfos})
    } else {
        console.log(req.body.id);
        
        const post = await UserModel.findOne({_id: req.body.id}).select('-MotDePasse -Email')
        res.status(200).json({loggedIn: true, infos: post, userId: req.session.sessionInfos})
    }
    
}

export const PostUtilisateur = async (req: any, res: any): Promise<void> => {
    const post = await new UserModel(req.body).save()

    if(post) {
        req.session.sessionInfos = post
        req.session.save()
        
        res.status(200).json({loggedIn: true, infos: post, userId: req.session.sessionInfos})
    } else {
        res.status(400).json({ message: "Error" })
    }
}

export const ChangePassword = async (req: any, res: any): Promise<void> => {
    if(!req.session.sessionInfos) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
    const hash = await argon2.hash(req.body.MotDePasse)
    const post = await UserModel.findOneAndUpdate({ _id: req.params.id }, { MotDePasse: hash, WasReset: false})
    res.status(200).json(post)
}

export const ResetPassword = async (req: any, res: any): Promise<void> => {

    const tempMdp = uniqid()
    const hash = await argon2.hash(tempMdp)
    const post = await UserModel.findOneAndUpdate({ Email: req.body.Email }, { MotDePasse: hash, WasReset: true})

    if(post) {
        sendEmail(req.body.Email, 
        `Votre mot de passe a été réinitialisé avec succès ! \n` +
        `Votre mot de passe temporaire est: ${tempMdp}. \n` +
        `Vous serrez invité à changer votre mot de passe dès votre prochaine connexion.`)
        res.status(200).json(post)
    } else {
        res.status(400).json({ message: "Email not found" })
    }
}

export const ReportUtilisateur = async (req: any, res: any): Promise<void> => {
    if(!req.session.sessionInfos) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
    const post = await UserModel.findByIdAndUpdate(req.params.id, { $inc: { Reported: 1 } })

    if(post && post.Reported === 5) {
        await UserModel.findByIdAndUpdate(req.params.id, { Banned: true })
        const userEmail = await UserModel.findById(req.params.id).select('Email')
        if(userEmail) {
            sendEmail(userEmail.Email, `Votre compte a été banni suite à de multiples reports.`)
            req.session.destroy()
        } else {
            res.status(400).json({ message: "Email not found" })
        }
    }
    res.status(200).json(post)
}

export const EditUtilisateur = async (req: any, res: any): Promise<void> => {
    if(!req.session.sessionInfos) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }

    // ! Ingérable avec un switch case
    if(req.body.Materiel){
       const postMateriel = await UserModel.findByIdAndUpdate(req.params.id, { $push: { Materiels: req.body.value } })
       res.status(200).json(postMateriel)
    }
    if(req.body.Service){
      const postService = await UserModel.findByIdAndUpdate(req.params.id, { $push: { Services: req.body.value } })
      res.status(200).json(postService)
    }
    if(req.body.Interet){
        const postInteret = await UserModel.findByIdAndUpdate(req.params.id, { $push: { Interets: req.body.value } })
        res.status(200).json(postInteret)
    }
    else {
        const post = await UserModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(post)
    }
}

// TODO merge dans edit utilisateur
export const AddCommunautesUtilisateur = async (req: any, res: any): Promise<void> => {
    if(!req.session.sessionInfos) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }

    const ObjectId = new mongoose.Types.ObjectId(req.body.Communaute)

    const post = await UserModel.findByIdAndUpdate(req.params.id, 
        { 
            $push: { 
                communautésSuivies:{
                    Communaute: ObjectId
                } 
            } 
        })
    res.status(200).json(post)
}

// TODO merge dans edit utilisateur
export const AddUtilisateursUtilisateur = async (req: any, res: any): Promise<void> => {
    if(!req.session.sessionInfos) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
    if(req.body.utilisateur === req.params.id) {
        res.status(400).json({ message: "Vous ne pouvez pas vous suivre vous-même" })
        return
    }
    
    const ObjectId = new mongoose.Types.ObjectId(req.body.utilisateur)

    const post = await UserModel.findByIdAndUpdate(req.params.id, 
        { 
            $push: { 
                utilisateursSuivis:{
                    Utilisateur: ObjectId
                } 
            } 
        })
    res.status(200).json(post)
}

export const GetUtilisateursCommunaute = async (req: any, res: any): Promise<void> => {
    if(!req.session.sessionInfos) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
    const post = await UserModel.find({ communautesSuivies: req.params.id }).select('-MotDePasse -Email')
    res.status(200).json(post)
}

export const DeleteCommunautesUtilisateur = async (req: any, res: any): Promise<void> => {
    if(!req.session.sessionInfos) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
    const post = await UserModel.findByIdAndUpdate(req.params.id, { $pull: { communautesSuivies: req.body.communaute } })
    res.status(200).json(post)
}

export const DeleteUtilisateursUtilisateur = async (req: any, res: any): Promise<void> => {
    if(!req.session.sessionInfos) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
    const post = await UserModel.findByIdAndUpdate(req.params.id, { $pull: { utilisateursSuivis: req.body.utilisateur } })
    res.status(200).json(post)
}

export const DeleteUtilisateur = async (req: any, res: any): Promise<void> => {
    if(!req.session.sessionInfos) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }
    const suiveurs = await UserModel.find({ utilisateursSuivis: req.params.id })
    suiveurs.forEach(async (suiveur) => {
        await UserModel.findByIdAndUpdate(suiveur._id, { $pull: { utilisateursSuivis: req.params.id } })
    })

    const communautes = await UserModel.find({ communautesSuivies: req.params.id })
    communautes.forEach(async (communaute) => {
        await UserModel.findByIdAndUpdate(communaute._id, { $pull: { communautesSuivies: req.params.id } })
    })

    const post = await UserModel.findByIdAndDelete(req.params.id)
    res.status(200).json(post)
}

export const searchUtilisateursByServices = async (req: any, res: any): Promise<void> => {
    const post = await UserModel.find({
        $or: [
            { 'Materiels.Nom': { $regex: req.query.q, $options: 'i' } },
            { 'Services.Nom': { $regex: req.query.q, $options: 'i' } },
        ]}).select('-MotDePasse -Email')
    res.status(200).json(post)
}

export const searchUtilisateursName = async (req: any, res: any): Promise<void> => {
    const post = await UserModel.find({NomPrenom: { $regex: req.query.q, $options: 'i' }}).select('-MotDePasse -Email')
    res.status(200).json(post)
}