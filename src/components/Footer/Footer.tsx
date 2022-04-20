import React from 'react';
import './footer.scss';
import { ReactComponent as DiscordSVG } from '../../svg/discord.svg';
import { ReactComponent as TwitterSVG } from '../../svg/twitter.svg';
import { ReactComponent as MediumSVG } from '../../svg/medium.svg';
import { ReactComponent as TelegramSVG } from '../../svg/telegram.svg';
import { ReactComponent as GithubSVG } from '../../svg/github.svg';
import { ReactComponent as DapplookerSVG } from '../../svg/dapplooker-logo.svg';

const Footer: React.FunctionComponent<any> = () => {
  return (
    <>
      <footer>
        <div className="footer-left-info">
          Built with
          <a
            href="https://dapplooker.com/"
            target="_blank"
            rel="noreferrer"
            className="icon icn-dapplooker"
          >
            <DapplookerSVG />
          </a>
          Graph protocol
        </div>
        <div className="social-icons-footer">
          <div className="icon">
            <a href="https://discord.com/invite/FWyNJtEyxa" target="_blank" rel="noreferrer">
              <DiscordSVG />
            </a>
          </div>

          <div className="icon">
            <a href="https://twitter.com/dapplooker" target="_blank" rel="noreferrer">
              <TwitterSVG />
            </a>
          </div>

          <div className="icon">
            <a href="https://dapplooker.medium.com/" target="_blank" rel="noreferrer">
              <MediumSVG />
            </a>
          </div>

          <div className="icon">
            <a href="https://t.me/dapplooker" target="_blank" rel="noreferrer">
              <TelegramSVG />
            </a>
          </div>

          <div className="icon">
            <a href="https://github.com/dapplooker" target="_blank" rel="noreferrer">
              <GithubSVG />
            </a>
          </div>
        </div>

        <div className="copyright-info">
          © 2022 made with ❤️ by
          <a href="https://dapplooker.com/" target="_blank" rel="noreferrer">
            DappLooker
          </a>
          team.
        </div>
      </footer>
    </>
  );
};

export default Footer;
