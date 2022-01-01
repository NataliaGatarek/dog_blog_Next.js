import classes from "./contact-form.module.css";
import { useState } from "react";

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [enteredText, setEnteredText] = useState("");

    function sendMessageHandler(event) {
        event.preventDefault();

        fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                name: enteredName,
                message: enteredText
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
    
    //mongodb//

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}> 
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your e-mail</label>
                        <input type="email" id="email" required value={enteredEmail} onChange= {(event)=> setEnteredEmail(event.target.value)} />
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="name">Your name</label>
                        <input type="text" id="name" required value={enteredName} onChange= {(event)=> setEnteredName(event.target.value)} />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your message</label>
                    <textarea id="message" rows="5" required value={enteredText} onChange= {(event)=> setEnteredText(event.target.value)} ></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Send message</button>
                </div>
            </form>
        </section>
    )
}
export default ContactForm;