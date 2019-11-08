import { login, register, logout } from '../service'
import { BaseState, Dispatch } from 'types/context'

export const states: BaseState = {
	isLoading: false,
	loginInfo: { token: "" },
	user: {
		id: "1",
		name: "jeff",
		email: "jeff@gmail.com"
	},
};

export const actions = {
	// setLoading({ isLoading }, payload: boolean) {
	// 	isLoading = payload;
	// },
	// setLogin({ loginInfo }, payload = {}) {
	// 	loginInfo = payload;
	// },
	clearLogin({ loginInfo }: BaseState) {
		loginInfo.token = null;
	},
	setUser({ user }: BaseState, payload = {}) {
		Object.assign(user, payload);
	},
	clearUser({ user }: BaseState) {
		user.id = null;
		user.name = null;
		user.email = null;
	},
};

export const asyncs = {
	async login(dispatch: Dispatch, payload = {}) {
		dispatch("setLoading", true);
		const ret = await login(payload);
		const data = ret.data;
		dispatch("setLoading", false);
		if (data.code == 200) {
			dispatch("setLogin", data.data);
			localStorage.setItem("loginInfo", JSON.stringify(data.data));
		} else {
			dispatch("clearLogin");
			localStorage.removeItem("loginInfo");
		}
		return ret;
	},
	async register(dispatch: Dispatch, payload = {}) {
		dispatch("setLoading", true);
		const ret = await register(payload);
		const data = ret.data;
		dispatch("setLoading", false);
		if (data.code == 200) {
			const loginRet = await login(payload);
			const rdata = loginRet.data;
			if (rdata.code == 200) {
				dispatch("setLogin", rdata.data);
				localStorage.setItem("loginInfo", JSON.stringify(rdata.data));
			}
			return loginRet;
		}
		return ret;
	},
	async logoutService(dispatch: Dispatch) {
		dispatch("setLoading", true);
		const ret = await logout();
		const data = ret.data;
		dispatch("setLoading", false);
		if (data.code == 200) {
			dispatch("clearLogin");
			dispatch("clearUser");
			localStorage.removeItem("loginInfo");
		}
		return ret;
	}
};
