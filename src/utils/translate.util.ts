export class TranslateUtil {
	public static withMapping<T, Y>(mapping: { [key: string]: string }, dataLanguageOrigen: Y): T {
		const translatedData: T = <T>{};
		Object.entries(dataLanguageOrigen).forEach(([key, value]) => {
			if (mapping[key]) {
				translatedData[mapping[key]] = value;
			}
		});
		return translatedData;
	}
}
