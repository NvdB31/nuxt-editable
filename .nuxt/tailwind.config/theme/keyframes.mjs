const _spin = {"to":{"transform":"rotate(360deg)"}}
const _ping = {"75%, 100%":{"transform":"scale(2)","opacity":"0"}}
const _pulse = {"50%":{"opacity":".5"}}
const _bounce = {"0%, 100%":{"transform":"translateY(-25%)","animationTimingFunction":"cubic-bezier(0.8,0,1,1)"},"50%":{"transform":"none","animationTimingFunction":"cubic-bezier(0,0,0.2,1)"}}
const config = { "spin": _spin, "ping": _ping, "pulse": _pulse, "bounce": _bounce,  }
export { config as default, _spin, _ping, _pulse, _bounce }