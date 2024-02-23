// routes/travelPackages.js
// routes/travelPackages.js
const path = require("path");
const fs = require("fs");

module.exports = (app, db, upload, uuidv4) => {
    // Ensure the uploads directory exists
    const uploadDir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Route to get all travel packages
    app.get("/travel_packages", (req, res) => {
        const sql = "SELECT * FROM travel_packages";
        db.query(sql, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error fetching travel packages" });
            }
            return res.json(data);
        });
    });

    // POST route to create a new travel package
    app.post(
        "/create",
        upload.fields([
            { name: "avatar", maxCount: 1 },
            { name: "gallery", maxCount: 10 },
        ]),
        (req, res) => {
            console.log(req.files); // Log the files received
            console.log(req.body); // Log the body content
            if (!req.files["avatar"] || req.files["avatar"].length === 0) {
                return res.status(400).json({ error: "Avatar image is required" });
            }

            const avatarImage = req.files["avatar"][0].filename;
            const packageId = uuidv4();
            const sql =
                "INSERT INTO travel_packages (`id`, `imageUrl`, `packageName`, `category`, `packageLocation`, `packagePrice`, `packageDate`, `packageDurationDate`, `packageDescription`, `amenitiesInHotel`, `agentName`, `agentNumber`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [
                packageId,
                avatarImage,
                req.body.packageName,
                req.body.packageCategory,
                req.body.packageLocation,
                req.body.packagePrice,
                req.body.packageDate,
                req.body.packageDurationDate,
                req.body.packageDescription,
                req.body.amenitiesInHotel,
                req.body.agentName,
                req.body.agentNumber,
            ];

            db.query(sql, values, (err, packageInsertData) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: err.message });
                }
                // If gallery images are uploaded, insert them into the package_images table
                // Use the inserted package's ID for the gallery images
                if (req.files["gallery"]) {
                    const galleryImages = req.files["gallery"].map((file) => file.filename);
                    const imageInsertSql = "INSERT INTO package_images (`package_id`, `image_url`) VALUES ?";
                    const imageValues = galleryImages.map((image) => [packageId, image]); // Ensure packageId is correct

                    db.query(imageInsertSql, [imageValues], (err, imagesInsertData) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ error: "Error adding gallery images" });
                        }
                        return res.json({
                            message: "Package and gallery images added successfully",
                            packageData: packageInsertData,
                            galleryData: imagesInsertData,
                        });
                    });
                } else {
                    return res.json({
                        message: "Package added successfully, but no gallery images were provided",
                        packageData: packageInsertData,
                    });
                }
            });
        }
    );

    // Update a package
    app.put("/update/:id", (req, res) => {
        // Ensure field names match those in the package table
        const sql = "UPDATE travel_packages SET `imageUrl` = ?, `packageName` = ?, `packageLocation` = ?, `packagePrice` = ?  WHERE `id` = ?";
        const values = [req.body.imageUrl, req.body.packageName, req.body.packageLocation, req.body.packagePrice]; // Add other fields as necessary
        const id = req.params.id;

        db.query(sql, [...values, id], (err, data) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.json(data);
        });
    });

    // Delete a package
    app.delete("/packages/id/:id", (req, res) => {
        const sql = "DELETE FROM travel_packages WHERE `id` = ?";
        const id = req.params.id;

        db.query(sql, [id], (err, data) => {
            if (err) return res.status(500).json({ error: err.message });
            // It might be good to check if the delete was actually performed (affected rows)
            if (data.affectedRows === 0) {
                return res.status(404).json({ message: "Package not found or already deleted" });
            }
            return res.json({ message: "Package deleted successfully", data });
        });
    });

    // Function to get all packages
    const getAllPackages = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM travel_packages";
            db.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    };

    // Function to find package by id
    const findPackageById = (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM travel_packages WHERE `id` = ?";
            db.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                // Assuming that the ID is unique, there should only be one result
                resolve(results[0]);
            });
        });
    };

    // Route to get all packages
    app.get("/packages", async (req, res) => {
        try {
            const packages = await getAllPackages();
            res.json(packages);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    // Route to get packages by category
    app.get("/packages/:category", async (req, res) => {
        try {
            const allPackages = await getAllPackages();
            const filteredPackages = allPackages.filter((pkg) => pkg.category === req.params.category);
            res.json(filteredPackages);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    // Route to get a package by id
    app.get("/packages/id/:id", async (req, res) => {
        try {
            // Query to fetch package details and associated images
            const packageDetailsSql = `
        SELECT p.*, GROUP_CONCAT(i.image_url) as imageUrls
        FROM travel_packages p
        LEFT JOIN package_images i ON p.id = i.package_id
        WHERE p.id = ?
        GROUP BY p.id
      `;

            db.query(packageDetailsSql, [req.params.id], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Internal server error" });
                }
                if (results.length === 0) {
                    return res.status(404).json({ message: "Package not found" });
                }
                // Format the response
                const packageData = results[0];
                packageData.imageUrls = packageData.imageUrls ? packageData.imageUrls.split(",") : [];
                res.json(packageData);
            });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    // Other function declarations and route handlers...
};