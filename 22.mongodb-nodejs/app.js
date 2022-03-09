const {MongoClient} = require('mongodb');
const ObjectID = require('mongodb').ObjectID

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect((error, client) => {
    if(error) {
        return console.log("Koneksi Gagal");
    }
    // pilih database
    const db = client.db(dbName);

//     // menambahkan 1 data
//     db.collection('mahasiswa').insertOne(
//         {
//             nama: "Erik",
//             email: "erik@gmail.com"
//         },
//         (error, result) => {
//             if(error) {
//                 return console.log('Gagal menambahkan data');
//             }
//             console.log(result);
//     });

// // Menambahkan lebih dari 1 data
// db.collection('mahasiswa').insertMany(
//     [
//         {
//             nama: 'Erika',
//             email: "erika@gmail.com"
//         },
//         {
//             nama: 'apip',
//             email: 'apip@gmail.com'
//         }
//     ],

//     (error, result) => {
//         if(error) {
//             return console.log('Gagal menambahkan data');
//         }
//         console.log(result);
//     }
// );

// // Menampilkan semua data
// console.log(
//     db.collection('mahasiswa')
//         .find()
//         .toArray((error, result) => {
//             console.log(result);
//         })
// );


// // Menampilkan data berdasarkan kriteria
// console.log(
//     db.collection('mahasiswa')
//         .find( {_id: ObjectID('62276c3144de38198c9db38f')} )
//         .toArray((error, result) => {
//             console.log(result);
//         })
// );

// // mengubah data berdasarkan id
// const updatePromise = db.collection('mahasiswa').updateOne(
//      {
//          _id: ObjectID('62276d29d582210228638fb2')
//      },
//      {
//          $set: {
//              nama: 'Erik'
//          }
//      }
// );

// updatePromise.then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })


// // mengubah data lebih dari 1
// db.collection('mahasiswa').updateMany(
//     {
//         nama: "Erik"
//     },
//     {
//         $set: {
//             nama: "Erik Doang"
//         }
//     }
// )

// // menghapus 1 data
// db.collection('mahasiswa').deleteOne(
//     {
//         _id: ObjectID('62276d29d582210228638fb3')
//     },
// ).then((result) => {
//     console.log(result)
// }).catch(error => console.log(error))

// menghapus lebih dari 1 data
db.collection('mahasiswa').deleteMany(
    {
        nama: "Erik Doang"
    },
).then((result) => {
    console.log(result)
}).catch(error => console.log(error))

});


