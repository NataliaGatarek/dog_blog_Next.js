import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/natalia.jpg" alt="image" width={300} height={300}/>
            </div>
            <h1>Hi, I am Natalia</h1>
            <p>I blog about dog's psychology</p>
        </section>
    )
}
export default Hero;