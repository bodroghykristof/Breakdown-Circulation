import React, { Fragment, useState } from 'react';
import WelcomeBox from './WelcomeBox';
import WelcomeHeader from './WelcomeHeader';
import WarningIcon from '@material-ui/icons/Warning';
import { Link } from 'react-router-dom';
import './welcome.scss';
import flamingo from '../../static/flamingo-nobg.png';
import flamingoReverse from '../../static/flamingo-nobg-reverse.png';

export default function Welcome() {
  const [verbose, setVerbose] = useState(false);

  const showMore = () => {
    setVerbose(true);
  };

  const iconStyle = {
    color: 'red',
  };

  return (
    <Fragment>
      <WelcomeHeader>Welcome to Cocktail Land</WelcomeHeader>
      <div className='flamingo-wrapper'>
        <img src={flamingoReverse} alt='flamingo' height='450px'></img>
        <WelcomeBox>
          <div className='box-header'>
            <WarningIcon style={iconStyle} />
            <h2>Warning</h2>
            <WarningIcon style={iconStyle} />
          </div>
          <p>
            This site offers a huge variety of alcoholic drinks, being not
            suitable for underage visitors. If you are under 18 please, for your
            own good, leave this page!
          </p>
          {verbose ? `` : <button onClick={showMore}>More</button>}
          <p className='details'>
            {verbose
              ? `Underage drinking is a serious public health problem in the United
        States and most of Europe. Alcohol is the most widely used substance among youth,
        and drinking by young people poses enormous health and safety risks. The
        consequences of underage drinking can affect everyone - regardless of age
        or drinking status.`
              : ``}
          </p>
          <p>Would you like to enter the page?</p>
          <Link to='/home'>
            <button>Yes</button>
          </Link>
          <a href='https://www.sesamestreet.org/'>
            <button>No</button>
          </a>
        </WelcomeBox>
        <img src={flamingo} alt='flamingo' height='450px'></img>
      </div>
    </Fragment>
  );
}
