const express = require('express')
// const auth = require('../middleware/auth')
const Patient = require('../models/patient')
const RegisteredPatient = require('../models/registeredPatients')
const router = new express.Router()

router.get('/patient/:id', async (req, res) => {
    const _id = req.params.id
    let patient

    try {
        patient = await Patient.findById({_id});        
        res.status(200).send({ patient })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/patients', async (req, res) => {
    let patients

    try {
        patients = await Patient.find();       
        if (!patients) {
            res.send({ message: 'error happened' })
        }
        res.status(200).send({ patients }) 
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/patient', async (req, res) => {
    const patient = new Patient(req.body)   

    try {
        await patient.save()

        res.status(201).send({ patient })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/patient/:id', async (req, res) => {
    const _id = req.params.id
    let patient

    try {
        patient = await Patient.findByIdAndUpdate(_id, req.body, {new: true});        
        res.status(200).send({ patient })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/registerd/patients', async (req, res) => {
    let patients

    try {
        patients = await RegisteredPatient.find();       
        if (!patients) {
            res.send({ message: 'error happened' })
        }
        res.status(200).send({ patients }) 
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/register/patient', async (req, res) => {
    const myPatient = req.body
    let patient = new RegisteredPatient({name: myPatient.name , _id: myPatient.id, register: myPatient.register})

    if (!patient) {
        res.status(400).send("patient error bro")
    }
    
    try {
        await patient.save()
        res.status(201).send({ patient })
    } catch (error) {
        
    }    

})

router.delete('/unregister/patient/:id', async (req, res) => {
    try {
        await RegisteredPatient.findByIdAndDelete({_id: req.params.id})
        res.status(200).send("done")
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get("/search", async (req, res) => {
    try {
      let result = await Patient
        .aggregate([
          {
            "$search": {
              "autocomplete": {
                "query": `${req.query.term}`,
                "path": "patientName",
              },
            },
          },
        ])
      res.send(result);
    } catch (error) {
      res.send({ message: error.message });
    }
  });

module.exports = router

// router.delete('/patients', async (req, res) => {
//     res.send("delete patient route")
// })


// const _id = req.params.id
// let patient
// try {
//     patient = await Patient.findByIdAndUpdate(_id, {"registered": req.body.registered}, {new: true, useFindAndModify: false});        
//     res.status(200).send({ patient })
// } catch (e) {
//     res.status(400).send(e)
// }