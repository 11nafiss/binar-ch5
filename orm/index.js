const express = require("express");
const { car } = require('./models');
const app = express();
const port = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Create car
app.post('/cars', (req, res) => {
    const body = req.body

    car.create(body).then(car => {
        res.status(200).json({ data: car })
    }).catch(err => {
        res.status(500).json(err)
    })
})

//Get all cars
app.get('/cars', (req, res) => {
    car.findAll().then(car => {
        res.status(200).json({ data: car })
    }).catch(err => {
        res.status(500).json(err)
    });
})

//Get data car by id
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;

    car.findByPk(id).then(car => {
        res.status(200).json({ data: car })
    }).catch(err => {
        res.status(500).json(err)
    });
})

app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body

    car.update(body, { where: { 'id': id } }).then(car => {
        res.status(200).json({ data: car })
    }).catch(err => {
        res.status(500).json(err)
    })
})

app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;

    car.destroy({ where: { 'id': id } }).then(car => {
        res.status(200).json({ data: car })
    }).catch(err => {
        res.status(500).json(err)
    })
})

app.get("/filter/:filter", (req, res) => {
    const id = req.params.filter;
    console.log(id);
    car.findAll({ where: {'size': id} }).then((car) => {
        res.status(200).json({ data: car });
      }).catch((err) => {
        res.status(500).json(err);
      });
});

app.listen(port, () => {
    console.log('running in port', port)
})