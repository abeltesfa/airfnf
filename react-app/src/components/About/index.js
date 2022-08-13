import aboutPic from '../../images/IMG_0788.JPG'
import './About.css'

const About = () => {

    return (
        <div className="page-outer">
            <div className="page-margin-add"></div>
            <div className="page-info">
            <div>
                    <h1>About:</h1>
                </div>
                <div>
                    <img className='aboutPic' alt='about' src={aboutPic}></img>
                </div>
                <div>
                    Link to the project <a href='https://github.com/abeltesfa/airfnf'>repo</a>
                </div>

                <div>
                    Link to my <a href='https://github.com/abeltesfa'>Github</a>
                </div>
                <div>
                    Link to my <a href='https://www.linkedin.com/in/abel-tesfa-93121866/'>LinkedIn</a>
                </div>
                <div>
                    <h2>Technologies Used:</h2>
                </div>
                <div>
                    <ul>
                        <li>React</li>
                        <li>Redux</li>
                        <li>CSS</li>
                        <li>Flask</li>
                        <li>Python</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About;
