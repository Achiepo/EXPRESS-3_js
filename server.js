const express = require('express')
const path = require('path')
const app = express()

//  engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//static files
app.use(express.static(path.join(__dirname, 'public')))

// middleware
 const checkWorkingHours = (req, res, next) => {
   const date = new Date()
  
   const hour = date.getHours()

  
   const isWorkingHour = hour >= 13 && hour < 19

   if ( isWorkingHour) {
     next();
   } else {
     res.render('closed')
   }
 }

 //hours middleware  routes
 app.use(checkWorkingHours)

// Routes
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/services', (req, res) => {
  res.render('services')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

// port
app.listen(4000, () => {
  console.log(`Server demaré http://localhost:4000`)
})