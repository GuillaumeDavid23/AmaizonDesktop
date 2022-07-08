export const REGALPHA = {
	value: /^[a-zA-Zéèçàùâêîûüëï ,'"-]+$/,
	message: "N'utilisez que des lettres et des guillemets/apostrophes."
}

// export const REGALPHANUM = {
// 	value: /^[a-zA-Z0-9éèçàùâêîûüëï]+$/,
// 	message: "N'utilisez que des lettres et des chiffres",
// }

export const REGSTRING = {
	value: /^[a-zA-Z0-9éèçàùâêîûüëï ,'"-]+$/,
	message: "N'utilisez que des lettres, chiffres et guillemets/apostrophes."
}

// export const REGBIRTHDATE = {
// 	value: /^[0-9/]+$/,
// 	message:
// 		'La date de naissance renseigné ne correspond pas au format requis: JJ/MM/AAAA',
// }

export const REGID = {
	value: /^[0-9]+$/,
	message: "N'utilisez que des chiffres."
}

export const REGNUM = {
	value: /^[0-9.]+$/,
	message: "N'utilisez que des chiffres et un point pour la décimal."
}

export const REGEMAIL = {
	value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
	message: 'Vous devez indiquer un email valide.'
}

export const REGPASSWORD = {
	value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
	message:
		'Le mot de passe renseigné ne correspond pas au format requis: Au minimum 8 caractères; au moins une lettre majuscule, une lettre minuscule et un chiffre.'
}

export const REGTEL = {
	value: /^((\+)33|0|0033)[1-9](\d{2}){4}$/g,
	message: 'Vous devez indiquer un numéro de téléphone valide.'
}

// export const REGZIP = {
// 	value: /^\d{5}$/,
// 	message:
// 		'Le code postal renseigné ne correspond pas au format requis: un nombre à 5 chiffres.',
// }

// export const REGCHECKBOX = {
// 	value: /^1$/,
// 	message: 'La valeur renvoyé par la checkbox est invalide.',
// }
