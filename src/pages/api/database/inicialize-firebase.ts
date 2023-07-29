import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAEPK7pGIWZljBZpxE85svvEwV7awkKQYo',
  authDomain: 'hackaton-caixa-visa.firebaseapp.com',
  projectId: 'hackaton-caixa-visa',
  storageBucket: 'hackaton-caixa-visa.appspot.com',
  messagingSenderId: '189964340297',
  appId: '1:189964340297:web:5160366262be93ed138398',
  measurementId: 'G-6K1F8KWTZ7',
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
export default database
