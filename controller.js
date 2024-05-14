const fs = require('fs')
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const JWT_SECRET = "letthebodysettheflow"

const ordersData = [
    {
        id: 7591,
        user: {
            name: "Christine",
            lastName: "Brooks"
        },
        address: "089 Kutch Green Apt. 448",
        date: "2024-03-22",
        category: {
            id: 1,
            title: "Electric"
        },
        status: "COMPLETED"
    },{
        id: 7592,
        user: {
            name: "Rosie",
            lastName: "Pearson"
        },
        address: "979 Immanuel Ferry Suite 526",
        date: "2024-03-30",
        category: {
            id: 2,
            title: "Book"
        },
        status: "PROCESSING"
    },{
        id: 7593,
        user: {
            name: "Darrell",
            lastName: "Caldwell"
        },
        address: "8587 Frida Ports",
        date: "2024-04-02",
        category: {
            id: 3,
            title: "Medicine"
        },
        status: "REJECTED"
    },{
        id: 7594,
        user: {
            name: "Gilbert",
            lastName: "Johnston"
        },
        address: "768 Destiny Lake Suite 600",
        date: "2024-04-03",
        category: {
            id: 4,
            title: "Mobile"
        },
        status: "COMPLETED"
    },{
        id: 7595,
        user: {
            name: "Alan",
            lastName: "Cain"
        },
        address: "042 Mylene Throughway",
        date: "2024-04-06",
        category: {
            id: 5,
            title: "Watch"
        },
        status: "PROCESSING"
    },{
        id: 7596,
        user: {
            name: "Alfred",
            lastName: "Murray"
        },
        address: "543 Weimann Mountain",
        date: "2024-04-09",
        category: {
            id: 3,
            title: "Medicine"
        },
        status: "COMPLETED"
    },{
        id: 7597,
        user: {
            name: "Maggie",
            lastName: "Sullivan"
        },
        address: "New Scottieberg",
        date: "2024-05-1",
        category: {
            id: 5,
            title: "Watch"
        },
        status: "PROCESSING"
    },{
        id: 7598,
        user: {
            name: "Rosie",
            lastName: "Todd"
        },
        address: "New Jon",
        date: "2024-05-01",
        category: {
            id: 3,
            title: "Medicine"
        },
        status: "ON_HOLD"
    },{
        id: 7599,
        user: {
            name: "Dollie",
            lastName: "Hines"
        },
        address: "124 Lyla Forge Suite 975",
        date: "2024-05-03",
        category: {
            id: 2,
            title: "Book"
        },
        status: "COMPLETED"
    },
]

const productsData = [
    {
        "id": 1,
        "title": "Cozy Cloud Slippers",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    },
    {
        "id": 2,
        "title": "Smart Travel Bottle",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 259
        }
    },
    {
        "id": 3,
        "title": "Noise-Cancelling Buds",
        "price": 55.99,
        "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.7,
            "count": 500
        }
    },
    {
        "id": 4,
        "title": "Mini Projector",
        "price": 15.99,
        "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        "rating": {
            "rate": 2.1,
            "count": 430
        }
    },
    {
        "id": 5,
        "title": "Sunrise Alarm Clock",
        "price": 695,
        "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        "rating": {
            "rate": 4.6,
            "count": 400
        }
    },
    {
        "id": 6,
        "title": "Bamboo Cutting Board",
        "price": 168,
        "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 70
        }
    },
    {
        "id": 7,
        "title": "Stainless Steel Mug",
        "price": 9.99,
        "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
        "rating": {
            "rate": 3,
            "count": 400
        }
    },
    {
        "id": 8,
        "title": "Workout Yoga Mat",
        "price": 10.99,
        "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
        "rating": {
            "rate": 1.9,
            "count": 100
        }
    },
    {
        "id": 9,
        "title": "Organic Cotton Tee",
        "price": 64,
        "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
        "rating": {
            "rate": 3.3,
            "count": 203
        }
    },
    {
        "id": 10,
        "title": "Stackable Storage Bins",
        "price": 109,
        "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
        "rating": {
            "rate": 2.9,
            "count": 470
        }
    },
    {
        "id": 11,
        "title": "Gourmet Coffee Beans",
        "price": 109,
        "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
        "rating": {
            "rate": 4.8,
            "count": 319
        }
    },
    {
        "id": 12,
        "title": "Wireless Charging Pad",
        "price": 114,
        "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
        "rating": {
            "rate": 4.8,
            "count": 400
        }
    },
]

function registration(req, res) {
    const body = req.body

    if (
        !body.email ||
        !body.username ||
        !body.password
    ) {
        res.status(400).json({
            "errorMessage": "Body validation failed"
        })
        return
    }

    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({
                "errorMessage": err
            })
        } else {
            const db = JSON.parse(data)

            const userExist = db.users.find(user => {
                return (
                    user.email === body.email ||
                    user.username === body.username
                )
            })

            if (userExist) {
                if (userExist.email === body.email) {
                    res.status(400).json({
                        "errorMessage": 'Email already exists'
                    })
                } else {
                    res.status(400).json({
                        "errorMessage": 'Username already exists'
                    })
                }
            } else {
                const newUser = {
                    id: uuid(),
                    first_name: '',
                    last_name: '',
                    phone: '',
                    username: body.username,
                    email: body.email,
                    password: body.password
                }

                db.users.push(newUser)

                fs.writeFile('db.json', JSON.stringify(db), 'utf8', (err, data) => {
                    if (err) {
                        res.status(500).json({
                            "errorMessage": err
                        })
                    } else {
                        const { password, ...userData } = newUser
                        const token = jwt.sign(userData, JWT_SECRET);
                        res.json({
                            token
                        })
                    }
                });
            }
        }
    })
}

function login(req, res) {
    const body = req.body

    if (
        !body.email ||
        !body.password
    ) {
        res.status(400).json({
            "errorMessage": "Body validation failed"
        })
        return
    }

    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({
                "errorMessage": err
            })
        } else {
            const db = JSON.parse(data)

            const userExist = db.users.find(user => {
                return (
                    user.email === body.email &&
                    user.password === body.password
                )
            })

            if (userExist) {
                const { password, ...userData } = userExist
                const token = jwt.sign(userData, JWT_SECRET);
                res.json({
                    token
                })
            } else {
                res.status(400).json({
                    "errorMessage": 'Username or password is incorrect'
                })
            }
        }
    })
}

function logout(req, res) {
    res.status(204).send()
}

function profileGetInfo(req, res) {
    const userData = verifyUser(req, res)
    res.json(userData)
}

function profileUpdate(req, res) {
    const userData = verifyUser(req, res)

    const body = req.body

    if (
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.phone
    ) {
        res.status(400).json({
            "errorMessage": "Body validation failed"
        })
        return
    } else {
        fs.readFile('db.json', {encoding: 'utf8'}, (err, data) => {
            const dbData = JSON.parse(data)
            const existingUser = dbData.users.find(u => u.id === userData.id)

            existingUser.first_name = body.first_name
            existingUser.last_name = body.last_name
            existingUser.email = body.email
            existingUser.phone = body.phone
            
            fs.writeFile('db.json', JSON.stringify(dbData), 'utf8', (err, data) => {
                if (err) {
                    res.status(500).json({
                        "errorMessage": err
                    })
                } else {
                    res.json(existingUser)
                }
            });
        })
    }

}

function productGetAll(req, res) {
    res.json(productsData)
}

function productGetBestsellers(req, res) {
    res.json(productsData.reverse())
}

function productGetById(req, res) {
    const id = req.params.id

    const existingProduct = productsData.find(p => p.id == id)

    if (!existingProduct) {
        res.status(404).json({
            errorMessage: "Product not found"
        })
        return
    } else {
        res.json(existingProduct)
    }
}

function productInsert(req, res) {
    const {title, categoryId, price, description, image} = req.body

    if (title && categoryId && price && image) {
        res.status(201).json({
            id: 13,
            title,
            price,
            description,
            category: "electronics",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: {
                "rate": 0,
                "count": 0
            }
        })
    } else {
        res.status(400).json({
            errorMessage: "Body is not correct"
        })
    }
}

function productUpdate(req, res) {
    const id = req.params.id
    const {title, categoryId, price, description, image} = req.body

    const existingProduct = productsData.find(p => p.id == id)

    if (!existingProduct) {
        res.status(404).json({
            errorMessage: "Product not found"
        })
        return
    }

    if (title && categoryId && price && image) {
        res.status(200).json({
            ...existingProduct,
            title,
            price,
            description
        })
    } else {
        res.status(400).json({
            errorMessage: "Body is not correct"
        })
    }
}

function productDelete(req, res) {
    res.status(200).end()
}

function orderGetAll(req, res) {
    res.json(ordersData)
}

function orderUpdate(req, res) {
    const orderStatuses = [
        'COMPLETED',
        'PROCESSING',
        'ON_HOLD',
        'REJECTED',
        'IN_TRANSIT'
    ]

    const status = req.body.status
    const id = req.params.id

    const existingOrder = ordersData.find(o => o.id == id)

    if (!existingOrder) {
        res.status(400).json({
            errorMessage: "Provided order id is not correct"
        })
        return
    }
    if (!status) {
        res.status(400).json({
            errorMessage: "'status' should be defined"
        })
        return
    }
    if (orderStatuses.includes(status)) {
        res.json({...existingOrder, status})
        return
    }
}

function pricingGetAll(req, res) {
    res.json([
        {
            name: "Basic",
            price: 14.99,
            features: [
                {
                    title: "Free Setup",
                    active: true
                },{
                    title: "Bandwidth Limit 10 GB",
                    active: true
                },{
                    title: "20 User Connection",
                    active: true
                },{
                    title: "Analytics Report",
                    active: false
                },{
                    title: "Public API Access",
                    active: false
                },{
                    title: "Plugins Intregation",
                    active: false
                },{
                    title: "Custom Content Management",
                    active: false
                }
            ]
        },
        {
            name: "Standard",
            price: 49.99,
            features: [
                {
                    title: "Free Setup",
                    active: true
                },{
                    title: "Bandwidth Limit 10 GB",
                    active: true
                },{
                    title: "20 User Connection",
                    active: true
                },{
                    title: "Analytics Report",
                    active: true
                },{
                    title: "Public API Access",
                    active: true
                },{
                    title: "Plugins Intregation",
                    active: false
                },{
                    title: "Custom Content Management",
                    active: false
                }
            ]
        },
        {
            name: "Premium",
            price: 89.99,
            features: [
                {
                    title: "Free Setup",
                    active: true
                },{
                    title: "Bandwidth Limit 10 GB",
                    active: true
                },{
                    title: "20 User Connection",
                    active: true
                },{
                    title: "Analytics Report",
                    active: true
                },{
                    title: "Public API Access",
                    active: true
                },{
                    title: "Plugins Intregation",
                    active: true
                },{
                    title: "Custom Content Management",
                    active: true
                }
            ]
        }
    ])
}

function teamGetAll(req, res) {
    res.json([
        {
            id: 1,
            firstName: "Jason",
            lastName: "Price",
            role: "Admin",
            email: "janick_parisian@yahoo.com",
            picture: "https://i.pravatar.cc/200?img=1"
        }, {
            id: 2,
            firstName: "Aaliyah",
            lastName: "Khan",
            role: "Software Engineer",
            email: "aaliyah_khan@hotmail.com",
            picture: "https://i.pravatar.cc/200?img=2"
        }, {
            id: 3,
            firstName: "Bruce",
            lastName: "Lee",
            role: "Martial Artist",
            email: "bruce_lee@legendary.com",
            picture: "https://i.pravatar.cc/200?img=3"
        }, {
            id: 4,
            firstName: "Cleopatra",
            lastName: "Philopator",
            role: "Pharaoh",
            email: "cleopatra@nile.com",
            picture: "https://i.pravatar.cc/200?img=4"
        }, {
            id: 5,
            firstName: "David",
            lastName: "Attenborough",
            role: "Naturalist",
            email: "david_attenborough@bbc.co.uk",
            picture: "https://i.pravatar.cc/200?img=5"
        }, {
            id: 6,
            firstName: "Emmanuelle",
            lastName: "Charpin",
            role: "Astronaut",
            email: "emmanuelle_charpin@esa.int",
            picture: "https://i.pravatar.cc/200?img=6"
        }, {
            id: 7,
            firstName: "Frida",
            lastName: "Kahlo",
            role: "Painter",
            email: "frida_kahlo@mexicanart.com",
            picture: "https://i.pravatar.cc/200?img=7"
        }, {
            id: 8,
            firstName: "Genghis",
            lastName: "Khan",
            role: "Emperor",
            email: "genghis_khan@mongolianempire.org",
            picture: "https://i.pravatar.cc/200?img=8"
        }, {
            id: 9,
            firstName: "Hildegard",
            lastName: "von Bingen",
            role: "Abbess",
            email: "hildegard@visionary.com",
            picture: "https://i.pravatar.cc/200?img=9"
        }, {
            id: 10,
            firstName: "Indira",
            lastName: "Gandhi",
            role: "Prime Minister",
            email: "indira_gandhi@indianpolitics.in",
            picture: "https://i.pravatar.cc/200?img=10"
        }, {
            id: 11,
            firstName: "Jimi",
            lastName: "Hendrix",
            role: "Musician",
            email: "jimi_hendrix@rocknroll.com",
            picture: "https://i.pravatar.cc/200?img=11"
        }, {
            id: 12,
            firstName: "Jason",
            lastName: "Price",
            role: "Admin",
            email: "janick_parisian@yahoo.com",
            picture: "https://i.pravatar.cc/200?img=12"
        },
    ])
}

function verifyUser (req, res) {
    const token = req.headers.authorization

    if (!token) {
        res.status(401).end()
    } else {
        let userData

        try {
            userData = jwt.verify(token, JWT_SECRET)
            return userData
        } catch (error) {
            res.status(400).json({
                "errorMessage": 'Token verification failed'
            })
        }
    }

    return false
}

module.exports = {
    registration,
    login,
    logout,
    profileGetInfo,
    profileUpdate,
    productGetAll,
    productGetBestsellers,
    productGetById,
    productInsert,
    productUpdate,
    productDelete,
    orderGetAll,
    orderUpdate,
    pricingGetAll,
    teamGetAll,
}