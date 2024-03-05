const _none = "none"
const _spin = "spin 1s linear infinite"
const _ping = "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite"
const _pulse = "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
const _bounce = "bounce 1s infinite"
const config = { "none": _none, "spin": _spin, "ping": _ping, "pulse": _pulse, "bounce": _bounce,  }
export { config as default, _none, _spin, _ping, _pulse, _bounce }