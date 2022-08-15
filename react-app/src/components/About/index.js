import aboutPic from '../../images/IMG_0788.JPG'
import './About.css'

const About = () => {

    return (
        <div className="page-outer">
            <div className="page-margin-add"></div>
            <div className="page-info">
                <div className='about-container'>
                    <div>
                        <h1>About:</h1>
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
                    <div className='about-info'>
                        <h1>airfnf</h1>
                        <p>AirFastNFurious is a site that allows users to create cars and book them. Users can upload pictures and set prices for the cars they upload.</p>
                        <p>This project was built through the front end React, Redux, and CSS and the back end Flask and Python.</p>
                        <p>My name is Abel Tesfa and I am an aspiring software engineer.</p>
                        <p>Enojy the site!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
