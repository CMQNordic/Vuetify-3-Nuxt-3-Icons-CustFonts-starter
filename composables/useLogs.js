import { useStorage } from "@vueuse/core";
const defaultValue = false;

/* Note! For server@SSR those will always return the default value */
/* Risk for hydration error if reverenced in UI before onMount()   */
const bAllLogs = useStorage("vue-app-all-logs-on", defaultValue);
const bInfoLogs = useStorage("vue-app-info-log-on", defaultValue);
const bTodoLogs = useStorage("vue-app-todo-log-on", defaultValue);
const bErrorLogs = useStorage("vue-app-error-log-on", defaultValue);
const bDebugLogs = useStorage("vue-app-debug-log-on", defaultValue);

bInfoLogs.value &&
	console.log(`✅ Initialized Logs`, {
		info: bInfoLogs.value ? "On" : "Off",
		debug: bDebugLogs.value ? "On" : "Off",
		error: bErrorLogs.value ? "On" : "Off",
		todo: bTodoLogs.value ? "On" : "Off",
	});

/* This "console.error" will remain in production build  */
const consoleError = console.error;

/** Type: LogRefs
 *  @typedef {Object} LogRefs
 *  @property {Ref<boolean>} bAllLogs
 *  @property {Ref<boolean>} bInfoLogs
 *  @property {Ref<boolean>} bDebugLogs
 *  @property {Ref<boolean>} bErrorLogs
 *  @property {Ref<boolean>} bTodoLogs
 */

const setLog = (val = false, type = "all") => {
	console.log(`👀👀👀 XXX setAllLogs(${val})`);
	if (type == "all") {
		bAllLogs.value = val;
		bInfoLogs.value = val;
		bDebugLogs.value = val;
		bErrorLogs.value = val;
		bTodoLogs.value = val;
	} else if (type == "info") {
		bInfoLogs.value = val;
	} else if (type == "debug") {
		bDebugLogs.value = val;
	} else if (type == "error") {
		bErrorLogs.value = val;
	} else if (type == "todo") {
		bTodoLogs.value = val;
	}
};

watch([bInfoLogs, bDebugLogs, bErrorLogs, bTodoLogs], (newValues) => {
	bAllLogs.value = !newValues.includes(false);

	bInfoLogs.value &&
		console.log(`✅ Logs changed. Status:`, {
			info: bInfoLogs.value ? "On" : "Off",
			debug: bDebugLogs.value ? "On" : "Off",
			error: bErrorLogs.value ? "On" : "Off",
			todo: bTodoLogs.value ? "On" : "Off",
		});
});

/** Function printing info logs (if enabled) to console (dev only)
 *  @param {string | Function} val - Message as string, or function wrapping "console.log" (preferably).
 *  @param {...any} vars - Additional console parameters.
 */
const info = (val, ...vars) => {
	bInfoLogs.value &&
		(typeof val == "function" ? val("✅") : console.log("✅", val, ...vars));
};

/** Function printing debug logs (if enabled) to console (dev only)
 *  @param {string | Function} val - Message as string, or function wrapping "console.log" (preferably).
 *  @param {...any} vars - Additional console parameters.
 */
const debug = (val, ...vars) => {
	bDebugLogs.value &&
		(typeof val == "function" ? val("👀") : console.log("👀", val, ...vars));
};

/** Function printing todo logs (if enabled) to console (dev only)
 *  @param {string | Function} val - Message as string, or function wrapping "console.log" (preferably).
 *  @param {...any} vars - Additional console parameters.
 */
const TODO = (val, ...vars) => {
	bTodoLogs.value &&
		(typeof val == "function" ? val("🚩[TODO]") : console.log("🚩[TODO]", val, ...vars));
};

/** Function printing error log to console (prod & dev)
 *  @param {string} msg - Main message string.
 *  @param {...any} vars - Additional console parameters.
 */
const error = (msg, ...vars) => {
	bErrorLogs.value && consoleError(`⛔[ERROR]`, msg, ...vars);
};

/** Asserts (Dev only) + logs to critical error console (Dev & Prod)
 *  @param {string} msg - Main message string.
 *  @param {...any} vars - Additional "console.error" parameters
 */
const assert = (msg, ...vars) => {
	bErrorLogs.value && consoleError(`⛔[CRITICAL ERROR]`, msg, ...vars);
	// This assets nut only in development as this line is removed in production.
	// @ts-ignore
	console.log(null[`FORCED ASSERT:` + msg]);
};

export { info, debug, error, assert, TODO };

export function useLogs(val) {
	console.log(`🔶 useLog() called`, val);
	onMounted(() => {
		console.log(`🔶🔶🔶 useLog@onMounted called`, val);
	});

	return {
		log: {
			info,
			debug,
			error,
			assert,
			TODO,
		},
		bool: {
			bInfoLogs,
			bDebugLogs,
			bErrorLogs,
			bTodoLogs,
			bAllLogs,
		},
		setLog,
	};
}
