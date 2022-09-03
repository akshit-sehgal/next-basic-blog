import Image from 'next/image';
import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/akshit.jpeg'
          alt='An image showing me'
          width={300}
          height={300} />
      </div>
      <h1>Hi, I am Akshit</h1>
      <p>I am a web engineer and I blog about my experiments with web.</p>
    </section>
  )

}

export default Hero;