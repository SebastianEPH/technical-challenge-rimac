import { $log } from 'ts-log-debug';

export default class TimeUtil {
	public static getCurrentDateTimeUTC(): Date {
		$log.info(` function getCurrentDateTimeUTC`);
		const now: Date = new Date();
		return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getMilliseconds());
	}
}
