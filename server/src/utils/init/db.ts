import mongoose from 'mongoose'


export default (dataBaseUrl: string) => {
  mongoose.connect(dataBaseUrl).then((_result) => console.log('Successfully connect to DB'))
  mongoose.connection.on('error', (err) => console.log(err))
};