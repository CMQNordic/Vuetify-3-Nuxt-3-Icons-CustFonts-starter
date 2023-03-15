import { useStorage } from "@vueuse/core";
const defaultValue = false;

/* Note! For SSR@server those will always return the default value */
/* Risk for hydration error if reverenced in UI before onMount()   */
const isErrorLogOn = useStorage("vue-app-error-log-on", defaultValue);
const isDebugLogOn = useStorage("vue-app-debug-log-on", defaultValue);
const areAllLogsOn = useStorage("vue-app-all-logs-on", defaultValue);
const isInfoLogOn = useStorage("vue-app-info-log-on", defaultValue);
const isTodoLogOn = useStorage("vue-app-todo-log-on", defaultValue);

isInfoLogOn.value &&
	console.log(`✅ Initialized Logs`, {
		info: isInfoLogOn.value ? "On" : "Off",
		debug: isDebugLogOn.value ? "On" : "Off",
		error: isErrorLogOn.value ? "On" : "Off",
		todo: isTodoLogOn.value ? "On" : "Off",
	});

/* This "console.error" not be removed in production build  */
const consoleError = console.error;

/** Type: LogRefs
 *  @typedef {Object} LogRefs
 *  @property {Ref<boolean>} areAllLogsOn
 *  @property {Ref<boolean>} isInfoLogOn
 *  @property {Ref<boolean>} isDebugLogOn
 *  @property {Ref<boolean>} isErrorLogOn
 *  @property {Ref<boolean>} isTodoLogOn
 */

/** Returns saved references for logs.
 *  Red from locale storage in client. On server always default.
 *  @returns {LogRefs} {@link LogRefs}
 */
const getLogRefs = () => {
	return {
		areAllLogsOn,
		isInfoLogOn,
		isDebugLogOn,
		isErrorLogOn,
		isTodoLogOn,
	};
};

const getLogRefsDefaults = () => {
	return {
		areAllLogsOn: ref(false),
		isInfoLogOn: ref(false),
		isDebugLogOn: ref(false),
		isErrorLogOn: ref(false),
		isTodoLogOn: ref(false),
	};
};

const setInfo = (val = false) => (isInfoLogOn.value = val);
const setDebug = (val = false) => (isDebugLogOn.value = val);
const setError = (val = false) => (isErrorLogOn.value = val);
const setTodo = (val = false) => (isTodoLogOn.value = val);
const setAll = (val = false) => {
	console.log(`XXX setAllLogs(${val})`);
	areAllLogsOn.value = val;
	isInfoLogOn.value = val;
	isDebugLogOn.value = val;
	isErrorLogOn.value = val;
	isTodoLogOn.value = val;
};

watch([isInfoLogOn, isDebugLogOn, isErrorLogOn, isTodoLogOn], (newValues) => {
	areAllLogsOn.value = !newValues.includes(false);

	isInfoLogOn.value &&
		console.log(`✅ Logs changed. Status:`, {
			info: isInfoLogOn.value ? "On" : "Off",
			debug: isDebugLogOn.value ? "On" : "Off",
			error: isErrorLogOn.value ? "On" : "Off",
			todo: isTodoLogOn.value ? "On" : "Off",
		});
});

/** Logs to console if "info logs" are enabled (Dev only)
 *  @param {string | Function} val - Message as string, or function wrapping "console.log" (preferably).
 *  @param {...any} vars - Additional console parameters.
 */
const info = (val, ...vars) => {
	isInfoLogOn.value &&
		(typeof val == "function" ? val("✅") : console.log("✅", val, ...vars));
};

/** Logs to console if d"ebug logs" are enabled (Dev only)
 *  @param {string | Function} val - Message as string, or function wrapping "console.log" (preferably).
 *  @param {...any} vars - Additional console parameters.
 */
const debug = (val, ...vars) => {
	isDebugLogOn.value &&
		(typeof val == "function" ? val("👀") : console.log("👀", val, ...vars));
};

/** Logs to console if "todo logs" are enabled (Dev only)
 *  @param {string | Function} val - Message as string, or function wrapping "console.log" (preferably).
 *  @param {...any} vars - Additional console parameters.
 */
const TODO = (val, ...vars) => {
	isTodoLogOn.value &&
		(typeof val == "function" ? val("🚩[TODO]") : console.log("🚩[TODO]", val, ...vars));
};

/** Logs error if "error logs" are enabled (Dev & Prod)
 *  @param {string} msg - Main message string.
 *  @param {...any} vars - Additional console parameters.
 */
const error = (msg, ...vars) => {
	isErrorLogOn.value && consoleError(`⛔[ERROR]`, msg, ...vars);
};

/** Asserts (Dev only) + logs to critical error console (Dev & Prod)
 *  @param {string} msg - Main message string.
 *  @param {...any} vars - Additional "console.error" parameters
 */
const assert = (msg, ...vars) => {
	isErrorLogOn.value && consoleError(`⛔[CRITICAL ERROR]`, msg, ...vars);
	// This assets nut only in development as this line is removed in production.
	// @ts-ignore
	console.log(null[`FORCED ASSERT:` + msg]);
};

export function useLogs() {
	return {
		log: {
			info,
			debug,
			TODO,
			error,
			assert,
		},
		defaultValue,
		refs: {
			bInfo: readonly(isInfoLogOn),
			bDebug: readonly(isDebugLogOn),
			bError: readonly(isErrorLogOn),
			bTodo: readonly(isTodoLogOn),
			bAll: readonly(areAllLogsOn),
		},
		set: {
			info: setInfo,
			debug: setDebug,
			error: setError,
			todo: setTodo,
			all: setAll,
		},
	};
}
