$(function () {
  $(".layui-form-item a").click(() => {
    $(".login-box").toggle().next().toggle()
  })
  const layuiForm = layui.form
  layuiForm.verify({
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格!"],
    repeatPassword: function (value) {
      const password = $(".register-box [name=password]").val()
      if (value !== password) {
        console.log(password, value)
        return "输入的两次密码不一致!"
      }
    },
  })

  const layer = layui.layer

  function loginSuccess(res) {
    if (res.status !== 0) {
      return layer.msg("登录失败！")
    }
    layer.msg("登录成功！")
    localStorage.setItem("token", res.token)
    location.href = "/index.html"
  }

  function registerSuccess(res) {
    if (res.status !== 0) {
      return layer.msg(res.message)
    }
    layer.msg("注册成功，请登录！")
    $('.layui-form-item a').eq(1).click()
  }

  
  $(".layui-form").on("submit", (event) => {
    event.preventDefault()
    const formEl = event.target
    const id = $(formEl).attr("id")
    let url = ""
    let success
    if (id === "login-form") {
      url = "/api/login"
      success = loginSuccess
    } else {
      url = "/api/reguser"
      success = registerSuccess
    }
    $.ajax({
      type: "post",
      url,
      data: $(formEl).serialize(),
      success,
    })
  })
})