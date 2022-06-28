import React, { useState } from 'react';

import { ButtonGetStarted } from '../components/Button/ButtonGetStarted';
import { ButtonsLogin } from '../components/ButtonMenu/ButtonsLogin';

import { MenuHeader } from '../components/Menu/MenuHeader';
import { MenuHamburger } from '../components/Menu/MenuHamburger';

import { Card } from '../components/Cards/Card';
import { ShortenLinkDiv } from '../components/ShortenLink/ShortenLinkDiv';

import logo from '../assets/logo.svg';
import logoLight from '../assets/logoLight.svg';

import illustrationWorking from '../assets/illustration-working.svg';

import brandRecognitionIcon from '../assets/icon-brand-recognition.svg';
import detailedRecordsIcon from '../assets/icon-detailed-records.svg';
import fullyCustomizableIcon from '../assets/icon-fully-customizable.svg';

import facebookIcon from '../assets/icon-facebook.svg';
import facebookHoverIcon from '../assets/icon-facebookHover.svg';

import twitterIcon from '../assets/icon-twitter.svg';
import twitterHoverIcon from '../assets/icon-twitterHover.svg';

import pinterestIcon from '../assets/icon-pinterest.svg';
import pinterestHoverIcon from '../assets/icon-pinterestHover.svg';

import instagramIcon from '../assets/icon-instagram.svg';
import instagramHoverIcon from '../assets/icon-instagramHover.svg';

import '../scss/Main.scss';

export function UrlShorteningApi() {
    const [changeFacebookIcon, setChangeFacebookIcon] = useState(false);
    const [changeTwitterIcon, setChangeTwitterIcon] = useState(false);
    const [changePinterestIcon, setChangePinterestIcon] = useState(false);
    const [changeInstagramIcon, setChangeInstagramIcon] = useState(false);

    const [takeLink, setTakeLink] = useState(null);
    const [shortenLink, setShortenLink] = useState('');
    const [clickButton, setClickButton] = useState(false);

    const [link, setLink] = useState('');
    const [linkError, setLinkError] = useState(null);
    const [inputError, setInputError] = useState(false);

    var regexLink = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

    var validLink = regexLink.test(link);

    function Validate() {
        setLinkError(null);

        if (link == '') {
            setLinkError('Please add a link');
            setInputError(true);

        } else if (validLink == false) {
            setLinkError('This link doesnt have the correct format.');
            setInputError(true);
        }
    }

    function ShortenLink() {
        let linkInput = document.getElementById('linkInput').value;
        
        if((linkInput == '') || (validLink == false)) {
            setClickButton(false);

        } else {
            setTakeLink(linkInput);

            let headersApi = {
                'Content-Type': 'application/json',
                'apiKey': '77dce80c5c84438f8850bf73455feadc'
            };

            let linkInputRequest = {
                destination: linkInput,
                domain: { fullName: 'rebrand.ly' }
            };

            fetch('https://api.rebrandly.com/v1/links', {
                method: 'POST',
                headers: headersApi,
                body: JSON.stringify(linkInputRequest)
                
            })
                .then(response => response.json())
                .then(json => {
                    setShortenLink(json.shortUrl);
                });

            setClickButton(true);
        }
    }

    return(
        <div className="container">
            <div className="urlShorteningApi">
                <header>
                    <div className="logoLinks">
                        <img src={logo} alt="Shortly logo - Description: Shortly Name in color black." />

                        <MenuHeader />
                    </div>

                    <ButtonsLogin />

                    <MenuHamburger />
                </header>

                <main>
                    <div className="infos">
                        <div className="infosImage">
                            <div className="infoButton">
                                <div className="title">
                                    <h1>More than just shorter links</h1>

                                    <h2>Build your brand´s recognition and get detailed insights on how your links are performing.</h2>
                                </div>

                                <ButtonGetStarted />
                            </div>
                            
                            <img src={illustrationWorking} alt="Image of a person working with a computer." />
                        </div>
                    </div>

                    <div className="cards">
                        <div className="input">
                            <div className="inputButton">
                                <input 
                                    id="linkInput" 
                                    type="text" 
                                    placeholder="Shorten a link here..." 
                                    value={link}
                                    onChange={(event) => {
                                        setLink(event.target.value);
                                        setLinkError(null);
                                        setInputError(false);
                                    }}
                                    className={inputError ? 'errorInput' : ''}
                                />
                    
                                <button 
                                    onClick={() => {
                                        Validate()
                                        ShortenLink()
                                    }}
                                >
                                    Shorten It!
                                </button>
                            </div>

                            <span className="error">{linkError}</span>
                        </div>

                        {
                            clickButton ? 
                                <ShortenLinkDiv takeLinkInput={takeLink} shortenLink={shortenLink} />
                            :
                                ''
                        }
                
                        <div className="titles">
                            <strong>Advanced Statistics</strong>

                            <p>Track how your links are performing across the web with our advanced statistics dashboard.</p>
                        </div>

                        <div className="borderCards">
                            <span></span>

                            <div className="infoCards">
                                <Card 
                                    id="card1"

                                    image={brandRecognitionIcon}
                                    description="Icon of a graph."

                                    title="Brand Recognition"
                                    text="Boost your brand recognition with each click. Generic links don´t mean a thing. Branded links help instil confidence in your content."
                                />

                                <Card 
                                    id="card2"

                                    image={detailedRecordsIcon}
                                    description="Icon of a clock."

                                    title="Detailed Records"
                                    text="Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions."
                                />

                                <Card 
                                    id="card3"

                                    image={fullyCustomizableIcon}
                                    description="Brushes Icon."

                                    title="Fully Customizable"
                                    text="Improve brand awareness and content discoverability through customizable links, supercharging audience engagement."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="infoButton2">
                        <strong>Boost your links today</strong>

                        <ButtonGetStarted />
                    </div>
                </main>

                <footer>
                    <div className="infoFooter">
                        <img src={logoLight} alt="Shortly logo - Description: Shortly Name in color white." />
                        
                        <nav>
                            <ul>
                                <li className="text">Features</li>

                                <li><a href="#">Link Shortening</a></li>
                                <li><a href="#">Branded Links</a></li>
                                <li><a href="#">Analytics</a></li>
                            </ul>

                            <ul>
                                <li className="text">Resources</li>

                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Developers</a></li>
                                <li><a href="#">Support</a></li>
                            </ul>

                            <ul>
                                <li className="text">Company</li>

                                <li><a href="#">About</a></li>
                                <li><a href="#">Our Team</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </nav>

                        <div className="socialMedias">
                            {
                                changeFacebookIcon ? 
                                    <img 
                                        src={facebookHoverIcon} 
                                        alt="Facebook icon - Description: Cyan background with letter F in background color(black)."
                                        onMouseOut={() => setChangeFacebookIcon(false)}
                                    />
                                :
                                    <img 
                                        src={facebookIcon} 
                                        alt="Facebook icon - Description: White background with letter F in background color(black)."
                                        onMouseOver={() => setChangeFacebookIcon(true)}
                                    />    
                            }

                            {
                                changeTwitterIcon ?
                                    <img 
                                        src={twitterHoverIcon} 
                                        alt="Twiiter icon - Description: Cyan bird"
                                        onMouseOut={() => setChangeTwitterIcon(false)}
                                    />
                                :
                                    <img 
                                        src={twitterIcon} 
                                        alt="Twiiter icon - Description: White bird." 
                                        onMouseOver={() => setChangeTwitterIcon(true)}
                                    /> 
                            }

                            {
                                changePinterestIcon ?
                                    <img  
                                        src={pinterestHoverIcon} 
                                        alt="Pinterest icon - Description: Cyan background with letter P in background color(black)."
                                        onMouseOut={() => setChangePinterestIcon(false)}
                                    />
                                :
                                    <img 
                                        src={pinterestIcon} 
                                        alt="Pinterest icon - Description: White background with letter P in background color(black)." 
                                        onMouseOver={() => setChangePinterestIcon(true)}
                                    />
                            }

                            {
                                changeInstagramIcon ?
                                    <img 
                                        src={instagramHoverIcon} 
                                        alt="Instagram icon - Description: Cyan camera."
                                        onMouseOut={() => setChangeInstagramIcon(false)}
                                    />
                                :
                                    <img 
                                        src={instagramIcon} 
                                        alt="Instagram icon - Description: White camera." 
                                        onMouseOver={() => setChangeInstagramIcon(true)}
                                    />
                            }
                        </div>
                    </div>

                    <div className="attribution">
                        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
                        Coded by <a href="https://github.com/Lara123-pg">Lara Fernanda</a>.
                    </div>
                </footer>
            </div>
        </div>
    );
}