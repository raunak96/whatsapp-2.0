import Head from "next/head";
import PropTypes from "prop-types";

const Meta = ({ title, keywords, description }) => {
	return (
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta name="keywords" content={keywords.join("")} />
			<meta name="description" content={description} />
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<title>{title}</title>
		</Head>
	);
};
Meta.propTypes = {
	title: PropTypes.string.isRequired,
	keywords: PropTypes.array.isRequired,
	description: PropTypes.string.isRequired,
};
Meta.defaultProps = {
	title: "Whatsapp 2.0",
	keywords: ["Web development, NextJs, SEO, SSR, MaterialUI"],
	description: "Whatsapp Clone with NextJs, Styled Components",
};

export default Meta;
