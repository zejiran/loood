let app = new Vue({
  el: "#app",
  data: {
    serverUrl: "https://loood.herokuapp.com/",
    imageFile: null,
    imageUrl: "",
    labels: [],
    error: "",
    displayImageSrc:
      "https://images.unsplash.com/photo-1562948840-f6cd9c89fe2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  },
  methods: {
    /**
     * called onchange of file input
     * @param {Event} e
     */
    fileSelected: function(e) {
      console.log(this.imageFile);
      this.displayImage({ event: e });
      this.uploadFile(e);
    },

    /**
     * called onchange of text input
     */
    urlPasted: function() {
      if (!this.imageUrl || this.imageUrl.trim() == "") return;

      this.imageUrl = this.imageUrl.trim();
      console.log("Image url: ", this.imageUrl);

      if (this.imageUrl.startsWith("http")) {
        this.displayImage({ url: this.imageUrl });
        this.sendImageUrl(this.imageUrl);
      }
    },

    // displays the image provided in the input (file) by user
    displayImage: function(image) {
      let e = image.event;
      if (e) {
        let files = e.target.files || e.dataTransfer.files;

        if (FileReader && files && files.length) {
          let fr = new FileReader();
          fr.onload = () => {
            this.displayImageSrc = fr.result;
          };
          fr.readAsDataURL(files[0]);
        }
      } else {
        // display image from the url
        this.displayImageSrc = image.url;
      }
    },

    uploadFile: function(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      let imageFile = files[0];

      let formData = new FormData();
      formData.append("file-upload", imageFile);

      const reqUrl = this.serverUrl + "/image-upload";
      console.log("reqUrl: ", reqUrl);
      axios
        .post(reqUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          this.displayLabels(response);
        })
        .catch(error => {
          console.log("ERROR: ", error);
        });
    },

    /**
     * Makes a post request to /image-upload with file-url attribute to fetch this image's labels
     * @param {String} imageUrl
     */
    sendImageUrl: function(imageUrl) {
      const reqUrl = this.serverUrl + "/image-upload";

      axios
        .post(reqUrl, {
          "file-url": imageUrl
        })
        .then(response => {
          this.displayLabels(response);
        })
        .catch(error => {
          console.log("ERROR: ", error);
        });
    },

    /**
     * show the image description labels with v-for
     * @param {Array} labels
     */
    displayLabels: function(response) {
      console.log("Response: ", response.data);
      const data = response.data;

      // reset previous ones
      this.error = "";
      this.labels = [];

      if (data && data.error) {
        // TODO set and display error7
        this.error = data.error;
      } else {
        // TODO set and display labels
        this.labels = data;
      }
    }
  }
});