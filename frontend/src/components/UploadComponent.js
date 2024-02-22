import React from 'react';
import axios from 'axios';

class UploadComponent extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
      
        axios.post(`https://thepilgrimbeez.com/upload`, data)
          .then(response => {
            console.log(response.data); // Check the response from the server
            alert('File uploaded successfully');
          })
          .catch(error => {
            console.error(error);
            alert('Error in file upload');
          });
      }      

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <input type="file" name="image" />
            <input type="text" name="packageName" placeholder="Package Name" />
            <input type="number" name="packagePrice" placeholder="Package Price" />
            <input type="date" name="packageDate" />
            <button type="submit">Upload</button>
        </form>
        );
  }
}

export default UploadComponent;
