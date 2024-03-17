// import { fakerFR } from "@faker-js/faker"
// import argon2 from "argon2"
// import CategoriesSchema  from "../models/categories.model"
// import UtilisateursSchema from "../models/utilisateurs.model"
// import MaterielsSchema from "../models/materiel.model"
// import ServicesSchema from "../models/services.model"
// import CommunauteSchema from "../models/communautes.model"

// // NOTICE : Categories
   
// // function fakeCategories(){
// //     return {
// //         Nom: fakerFR.helpers.uniqueArray(fakerFR.word.noun, 1).splice(0, 1).join(''),
// //         Pictogramme: "picto.png",
// //         Type: fakerFR.helpers.arrayElement(['Materiel', 'Service'])
// //     }
// // }

// // for (let i = 0; i < 50; i++) {
// //     const categories = new CategoriesSchema(fakeCategories())
// //      categories.save()
// // }

// // NOTICE : Utilisateurs

// // function fakeUtilisateurs(){
// //     return {
// //         NomPrenom: fakerFR.helpers.maybe(() => fakerFR.person.fullName(), { probability: 0.8 }),
// //         Genre: fakerFR.helpers.maybe(() => fakerFR.helpers.arrayElements(['Homme', 'Femme', 'Autre']).splice(0, 1).join(''), { probability: 0.8 }),
// //         Email: fakerFR.helpers.uniqueArray(fakerFR.internet.email, 1).splice(0, 1).join(''),
// //         MotDePasse: fakerFR.internet.password(),
// //         DateDeNaissance: fakerFR.helpers.maybe(() => fakerFR.date.birthdate(), { probability: 1 }),
// //         Ville: fakerFR.helpers.maybe(() => fakerFR.location.city(), { probability: 0.8 }),
// //         Photo: fakerFR.helpers.maybe(() => fakerFR.image.avatar(), { probability: 0.7 }),
// //     }
// // }

// // for (let i = 0; i < 15; i++) {
// //     const utilisateurs = new UtilisateursSchema(fakeUtilisateurs())
// //     // utilisateurs.save()
// //     console.log(fakeUtilisateurs().MotDePasse);
// // }

// // NOTICE : Communautes

// // async function fakeCommunautes(){
// //     return {
// //         Nom: fakerFR.helpers.uniqueArray(fakerFR.word.noun, 1).splice(0, 1).join(''),
// //         CategorieCommunaute: await CategoriesSchema.find().select('_id').then((data) => data[Math.floor(Math.random() * data.length)]._id),
// //         Description: fakerFR.lorem.paragraph(),
// //         Createur: await UtilisateursSchema.find().select('_id').then((data) => data[Math.floor(Math.random() * data.length)]._id),
// //         Photo: "defaultCommunaute.jpg",
// //     }
// // }

// // for (let i = 0; i < 15; i++) {
// //     fakeCommunautes().then((data) => {
// //         const communautes = new CommunauteSchema(data)
// //         communautes.save();
// //     })
// // }

// // NOTICE : Materiels

// // async function fakeMateriels(){
// //     return {
// //         Nom: fakerFR.helpers.uniqueArray(fakerFR.word.noun, 1).splice(0, 1).join(''),
// //         Categorie: await CategoriesSchema.find().select('_id').then((data) => data[Math.floor(Math.random() * data.length)]._id)
// //     }
// // }

// // for (let i = 0; i < 15; i++) {
// //     fakeMateriels().then((data) => {
// //         const materiels = new MaterielsSchema(data)
// //         // materiels.save();
// //     })
// // }

// // NOTICE : Services 

// // async function fakeServices(){
// //     return {
// //         Nom: fakerFR.helpers.uniqueArray(fakerFR.word.noun, 1).splice(0, 1).join(''),
// //         Categorie: await CategoriesSchema.find().select('_id').then((data) => data[Math.floor(Math.random() * data.length)]._id)
// //     }
// // }

// // for (let i = 0; i < 15; i++) {
// //     fakeServices().then((data) => {
// //         const services = new ServicesSchema(data)
// //         // services.save();
// //     })
// // }
