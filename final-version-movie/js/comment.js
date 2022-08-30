class WebComponent extends HTMLElement {
    // constructor() {
    //   super();
  
      connectedCallback() {
        let name = this.getAttribute('name');
        let email = this.getAttribute('email');
        let comment = this.getAttribute('comment');

        this.innerHTML = `
        <div class="comment-form">
        <p>${name} | ${email}</p>
        <hr>
        ${comment}

        <style>
        .comment-form {
            width: 40%;
            height: auto;
            padding 10px;
            border: 1px brown;
            background-color: rgb(253, 222, 250);
        }
        h2 {
          margin-bottom: 10px;
          align-items: center;
          font-weight: bold;
          color: brown;
        }
        p {
            color: rgb(132, 9, 198);
        }
       
    </style>
    </div>
        `;
        
      }

       }
//   }
  
  
  customElements.define("web-component", WebComponent);