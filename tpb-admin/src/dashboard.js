import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                // Make sure the REACT_APP_API_URL is set in your .env file and points to your server's domain
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/packages`);
                setPackages(response.data);
            } catch (err) {
                setError("An error occurred while fetching the packages.");
                console.error(err);
            }
            setLoading(false);
        };

        fetchPackages();
    }, []);

    const handleDeletePackage = (packageId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this package?");
        if (confirmDelete) {
            axios
                .delete(`${process.env.REACT_APP_API_URL}/packages/id/${packageId}`)
                .then((response) => {
                    // Log the response for debugging
                    console.log("Delete response:", response);
                    // Update the state only if the response is successful
                    if (response.status === 200 || response.status === 204) {
                        setPackages(packages.filter((packageItem) => packageItem.id !== packageId));
                    }
                })
                .catch((error) => {
                    // Log the error for debugging
                    console.error("Error deleting package:", error.response || error.message);
                });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        files.forEach((fileItem) => {
            data.append("gallery", fileItem.file);
        });

        // Correct endpoint
        const endpoint = "https://thepilgrimbeez.com/create";

        axios
            .post(endpoint, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                alert("Package added successfully");
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.status === 404) {
                    alert("The server endpoint was not found. Please check the URL.");
                } else {
                    alert("Error in package upload: " + error.message);
                }
            });
    };

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        const filePreviews = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                filePreviews.push({
                    name: file.name,
                    src: e.target.result,
                    file: file, // Include the file itself here
                });
                // It's better to set the state outside of the loop
            };

            fileReader.readAsDataURL(file);
        }

        // Set the state here after the loop
        setFiles([...filePreviews]);
    };

    const removeFile = (fileName) => {
        setFiles(files.filter((file) => file.name !== fileName));
    };

    if (loading) {
        return <div>Loading packages...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div>
                <div className="wrapper">
                    <div className="main-header">
                        <div className="logo-header">
                            <h6>TPB Admin</h6>
                            <button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <button className="topbar-toggler more">
                                <i className="la la-ellipsis-v"></i>
                            </button>
                        </div>
                        <nav className="navbar navbar-header navbar-expand-lg">
                            <div className="container-fluid">
                                <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
                                    {/* <li className="nav-item dropdown hidden-caret">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="la la-bell"></i>
                                            <span className="notification">3</span>
                                        </a>
                                        <ul className="dropdown-menu notif-box" aria-labelledby="navbarDropdown">
                                            <li>
                                                <div className="dropdown-title">You have 4 new notification</div>
                                            </li>
                                            <li>
                                                <div className="notif-center">
                                                    <a href="#">
                                                        <div className="notif-icon notif-primary">
                                                            <i className="la la-user-plus"></i>
                                                        </div>
                                                        <div className="notif-content">
                                                            <span className="block">New user registered</span>
                                                            <span className="time">5 minutes ago</span>
                                                        </div>
                                                    </a>
                                                    <a href="#">
                                                        <div className="notif-icon notif-success">
                                                            <i className="la la-comment"></i>
                                                        </div>
                                                        <div className="notif-content">
                                                            <span className="block">Rahmad commented on Admin</span>
                                                            <span className="time">12 minutes ago</span>
                                                        </div>
                                                    </a>
                                                    <a href="#">
                                                        <div className="notif-img">
                                                            <img src="assets/img/profile2.jpg" alt="Img Profile" />
                                                        </div>
                                                        <div className="notif-content">
                                                            <span className="block">Reza send messages to you</span>
                                                            <span className="time">12 minutes ago</span>
                                                        </div>
                                                    </a>
                                                    <a href="#">
                                                        <div className="notif-icon notif-danger">
                                                            <i className="la la-heart"></i>
                                                        </div>
                                                        <div className="notif-content">
                                                            <span className="block">Farrah liked Admin</span>
                                                            <span className="time">17 minutes ago</span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </li>
                                            <li>
                                                <a className="see-all" href="javascript:void(0);">
                                                    {" "}
                                                    <strong>See all notifications</strong> <i className="la la-angle-right"></i>{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </li> */}
                                    <li className="nav-item dropdown">
                                        <a className="dropdown-toggle profile-pic" data-toggle="dropdown" href="#" aria-expanded="false">
                                            {" "}
                                            <img src="assets/img/profile.jpg" alt="user-img" width="36" className="img-circle" />
                                            <span>Admin</span>{" "}
                                        </a>
                                        <ul className="dropdown-menu dropdown-user">
                                            <li>
                                                <div className="user-box">
                                                    <div className="u-img">
                                                        <img src="assets/img/profile.jpg" alt="user" />
                                                    </div>
                                                    <div className="u-text">
                                                        <h4>Admin</h4>
                                                        <p className="text-muted">hello@tpb.com</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">
                                                <i className="fa fa-power-off"></i> Logout
                                            </a>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="sidebar">
                        <div className="scrollbar-inner sidebar-wrapper">
                            <div className="user">
                                <div className="photo">
                                    <img src="assets/img/profile.jpg" alt=""/>
                                </div>
                                <div className="info">
                                    <a className="" data-toggle="collapse" href="#collapseExample" aria-expanded="true">
                                        <span>
                                            Juned S<span className="user-level">Administrator</span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <ul className="nav">
                                <li className="nav-item active">
                                    <a href="#">
                                        <i className="la la-dashboard"></i>
                                        <p>Dashboard</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="main-panel">
                        <div className="content">
                            <div className="container-fluid">
                                <div className="mini_header">
                                    <h4 className="page-title">Dashboard</h4>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPackageModel">
                                        <i class="la la-plus"></i> Add New Package
                                    </button>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <div className="card-title">Packages List</div>
                                            </div>
                                            <div className="card-body">
                                                <table id="example" className="table table-hover responsive nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th>IMAGE</th>
                                                            <th>PACKAGE NAME</th>
                                                            <th>CATEGORY</th>
                                                            <th>LOCATION</th>
                                                            <th>TOTAL PRICE</th>
                                                            <th>START DATE</th>
                                                            <th>DURATION</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {packages.map((packageItem) => (
                                                            <tr key={packageItem.id}>
                                                                {" "}
                                                                {/* Replace 'id' with the actual identifier property */}
                                                                <td>
                                                                    {/* Display the image if available */}
                                                                    <div className="avatar avatar-blue mr-3">
                                                                        {packageItem.imageUrl ? <img src={`${process.env.REACT_APP_UPLOAD_API_URL}/${packageItem.imageUrl}`} alt="Package" /> : "No Image"}
                                                                    </div>
                                                                </td>
                                                                <td>{packageItem.packageName}</td>
                                                                <td>{packageItem.category}</td>
                                                                <td>{packageItem.packageLocation}</td>
                                                                <td>{packageItem.packagePrice}</td>
                                                                <td>{packageItem.packageDate}</td>
                                                                <td>{packageItem.packageDurationDate}</td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-sm btn-icon" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            <i className="bx bx-dots-horizontal-rounded"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                                                            {/* <a className="dropdown-item" href="#">
                                                                                <i className="bx bxs-pencil mr-2"></i> Edit Profile
                                                                            </a> */}
                                                                            <a className="dropdown-item text-danger" href="#" onClick={() => handleDeletePackage(packageItem.id)}>
                                                                                <i className="bx bxs-trash mr-2"></i> Remove
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="addPackageModel" tabindex="-1" aria-labelledby="addPackageModelLabel" aria-hidden="true">
                    <form className="row g-3" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="addPackageModelLabel">
                                        Add New Package
                                    </h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body form_details">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-12">
                                            <div className="ctcp_form_inp">
                                                <label for="Image">UPLOAD IMAGE</label>
                                                <input type="file" name="avatar" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="ctcp_form_inp">
                                                <label for="Package Name">PACKAGE NAME</label>
                                                <input type="text" className="form-control" placeholder="Enter your package name" name="packageName" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="ctcp_form_inp">
                                                <label for="Package Name">CATEGORY</label>
                                                <select name="packageCategory" required>
                                                    <option value="">Select a Category</option>
                                                    <option value="POPULAR PACKAGES">POPULAR PACKAGES</option>
                                                    <option value="DUBAI PACKAGES">DUBAI PACKAGES</option>
                                                    <option value="KASHMIR FAMILY PACKAGES">KASHMIR FAMILY PACKAGES</option>
                                                </select>
                                                {/* <input type="text" className="form-control" placeholder="Enter your package name" name="packageCategory" /> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <label for="Location">LOCATION</label>
                                            <div className="ctcp_form_inp">
                                                <input type="text" className="form-control" id="inputPassword4" placeholder="Enter your location" name="packageLocation" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="ctcp_form_inp">
                                                <label for="Price">TOTAL PRICE</label>
                                                <input type="text" className="form-control" placeholder="Enter your price" name="packagePrice" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <label for="Date">START DATE</label>
                                            <div className="ctcp_form_inp">
                                                <input type="date" className="form-control" id="inputPassword4" name="packageDate" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <label for="text">DURATION</label>
                                            <div className="ctcp_form_inp">
                                                <input type="text" className="form-control" id="inputPassword4" placeholder="Duration" name="packageDurationDate" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <label for="text">PACKAGE DISCRIPTION</label>
                                            <div className="ctcp_form_inp">
                                                <textarea id="w3review" name="packageDescription" rows="5" cols="51"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <label for="text">AMINITIES IN HOTEL</label>
                                            <div className="ctcp_form_inp">
                                                <textarea id="w3review" name="amenitiesInHotel" rows="5" cols="51"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="ctcp_form_inp">
                                                <label for="text">AGENT NAME</label>
                                                <input type="text" className="form-control" placeholder="Enter your Name" name="agentName" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <label for="number">AGENT NUMBER</label>
                                            <div className="ctcp_form_inp">
                                                <input type="tel" className="form-control" id="inputPassword4" placeholder="Enter your number" name="agentNumber" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-12">
                                            <label for="number">GALLERY IMAGES</label>
                                            <input type="file" id="files" name="gallery" onChange={handleFileChange} multiple />
                                            <div className="setAlign">
                                                {files.map((file, index) => (
                                                    <span key={index} className="pip">
                                                        <img className="imageThumb" name="gallery" src={file.src} alt={file.name} title={file.name} />
                                                        <br />
                                                        <button className="remove" onClick={() => removeFile(file.name)}>
                                                            Remove image
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div class="ctcp_form_btn">
                                        <button type="submit">Publish</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Dashboard;