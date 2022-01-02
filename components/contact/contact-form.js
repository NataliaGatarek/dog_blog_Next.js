import classes from "./contact-form.module.css";
import { useState } from "react";
import Notification from "../ui/notification";


async function sendContactData(contactDetails) {
    const response = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(contactDetails),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
         }
}

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [enteredText, setEnteredText] = useState("");

    const [reqStatus, setReqStatus] = useState(); //pending, success, error//
    const [reqError, setReqError] = useState();

    async function sendMessageHandler(event) {
        event.preventDefault();

        setReqStatus("pending");

        try {
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredText
            });

            setReqStatus("success");   
            
        } catch {
            // setReqError(error.message);
            setReqError("Some error");
            setReqStatus("error");
        } 
    }
    

    let notification;

    if (reqStatus === "pending") {
        notification = {
            status: "pending",
            title: "Sending message...",
            message: "Your message is on it's way!"
        }
    }

    if (reqStatus === "success") {
        notification = {
            status: "success",
            title: "Success!",
            message: "Your message was sent..."
        }
    }

    if (reqStatus === "error") {
        notification = {
            status: "error",
            title: "Error!",
            message: reqError
        }
    }


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
          {notification && <Notification status= {notification.status} title={notification.title} message={notification.message} />}
        </section>
    )
}
export default ContactForm;