import FBIcon from "@/assets/facebook.svg";
import InstaIcon from "@/assets/instagram.svg";
import TeleIcon from "@/assets/Telegram.svg";
import YTIcon from "@/assets/youtube.svg";
import TwitterIcon from "@/assets/Twitter.svg";
import DiscIcon from "@/assets/Discord.svg";
import LinkedinIcon from "@/assets/Linkdin.svg";
import SimpleButton from "./ui/SimpleButton";

export default function SocialGroup() {
	return (
		<div className="flex justify-center items-center gap-5 mt-5">
			<SimpleButton>
				<a
					href="https://www.facebook.com/VITrendz-110405110659537/"
					target="_blank"
					rel="noreferrer noopener"
				>
					<img src={FBIcon} alt="Facebook" />
				</a>
			</SimpleButton>
			<SimpleButton>
				<a
					href="https://www.instagram.com/vitrendz/"
					target="_blank"
					rel="noreferrer noopener"
				>
					<img src={InstaIcon} alt="Instagram" />
				</a>
			</SimpleButton>
			<SimpleButton>
				<a
					href="https://twitter.com/TrendzVi?s=09"
					target="_blank"
					rel="noreferrer noopener"
				>
					<img src={TwitterIcon} alt="Twitter" />
				</a>
			</SimpleButton>
			<SimpleButton>
				<a
					href="https://www.linkedin.com/company/vitrendz/"
					target="_blank"
					rel="noreferrer noopener"
				>
					<img src={LinkedinIcon} alt="Linkedin" />
				</a>
			</SimpleButton>
			<SimpleButton>
				<a
					href="https://www.youtube.com/channel/UCmAwtdi2YTCA_ifMlx0yIDA"
					target="_blank"
					rel="noreferrer noopener"
				>
					<img src={YTIcon} alt="Youtube" />
				</a>
			</SimpleButton>
			<SimpleButton>
				<a
					href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRXzLtndANurS0p9MC-9NCARPip0KGSBQOUiFsFgxmfTVNkAPZmI0iTs5LMPIBk0LMRXO_qI_IgwqKG/pubhtml"
					target="_blank"
					rel="noreferrer noopener"
				>
					<img src={TeleIcon} alt="Telegram" />
				</a>
			</SimpleButton>
			<SimpleButton>
				<a
					href="https://discord.gg/qXK5BrCy"
					target="_blank"
					rel="noreferrer noopener"
				>
					<img src={DiscIcon} alt="Discord" />
				</a>
			</SimpleButton>
		</div>
	);
}
