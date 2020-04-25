import i18n from 'i18next';

// Languages
import en from './languages/en.json';

i18n.init({
	lng: 'en',
	debug: true,
	resources: {
		en,
	},
});

export default i18n;
