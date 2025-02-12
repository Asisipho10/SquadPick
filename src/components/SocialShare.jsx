import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

const SocialShare = () => {
  const shareUrl = window.location.href; // or customize it with a team URL

  return (
    <div className="social-share">
      <h3>Share Your Fantasy Team</h3>
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
};

export default SocialShare;

