<template>
    <div>
        <div class="container w-25 mt-5">
            <div v-if="loginMode">
                <div class="card">
                    <article class="card-body">
                        <h4 class="card-title text-center mb-4 mt-1">Sign in</h4>
                        <hr>
                        <p class="text-success text-center" id="notice">{{noti}}</p>
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <div class="input-group">
                                    <input name="" class="form-control" placeholder="Your identity card number"
                                           type="number" v-model="identityNumber">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input class="form-control" placeholder="******" type="password">
                                </div>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block"> Login</button>
                            </div>
                            <p class="float-left text-left btn-link">Forgot password?</p>
                            <p class="float-right text-right btn-link" @click="changeMode">Register</p>
                        </form>
                    </article>
                </div>
            </div>
            <div class="register" v-else>
                <div class="card">
                    <article class="card-body">
                        <h4 class="card-title text-center mb-4 mt-1">Sign up</h4>
                        <hr>
                        <p class="text-success text-center">{{noti}}</p>
                        <form @submit.prevent="signup">
                            <div class="form-group">
                                <p class="d-block float-left">You want to be</p>
                                <div class="float-right">
                                    <input type="radio" value="renter" checked v-model="type">
                                    <label class="radio-inline">Renter</label>
                                    <input type="radio" value="lender" v-model="type">
                                    <label class="radio-inline">Lender</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input name="" class="form-control" placeholder="Your identity card number"
                                           type="number" v-model="identityNumber">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input class="form-control" placeholder="******" type="password">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Fullname </label>
                                <input class="form-control" type="text" v-model="name">
                            </div>
                            <div class="form-group">
                                <label>Address </label>
                                <input class="form-control" type="text" v-model="address">
                            </div>
                            <div class="form-group">
                                <label>Phone </label>
                                <input class="form-control" type="number" v-model="phone">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block"> Sign up</button>
                            </div>
                            <p class="float-left btn-link" @click="changeMode">Have account? Login</p>
                        </form>
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
  import axios from 'axios'
  import VueCookies from 'vue-cookies'
  import router from '../router'

  function resetNoti(h) {
    setTimeout(function() {
      h.noti = ''
    }, 1000)
  }

  export default {
    name: 'Login',
    data: function() {
      return {
        noti: '',
        loginMode: false,
        type: '',
        identityNumber: '',
        password: '',
        name: '',
        address: '',
        phone: ''
      }
    },
    methods: {
      changeMode: function() {
        this.loginMode = !this.loginMode
        this.noti = ''
        this.identityNumber = ''
        this.password = ''
      },
      login: async function() {
        const h = this
        document.getElementById('notice').classList.add('text-success')
        document.getElementById('notice').classList.remove('text-danger')
        await axios.get('http://localhost:3000/api/Renter/' + this.identityNumber)
          .then(function(response) {
            if (response.status === 200) {
              console.log('it is renter')
              VueCookies.set('user', 'renter')
              VueCookies.set('id', h.identityNumber)
              console.log(VueCookies.get('id'))
              h.noti = 'Sucessful'
              resetNoti(h)
              router.push('/dashboard')
            }
          })
          .catch(function(error) {
            console.log(error)
            if (error) {
              if (error.response.status === 404) {
                console.log('it is not renter')
                axios.get('http://localhost:3000/api/VehicleOwner/' + h.identityNumber)
                  .then(function(r) {
                    if (r.status === 200) {
                      console.log('it is vehicle owner')
                      VueCookies.set('user', 'lender')
                      VueCookies.set('id', h.identityNumber)
                      console.log(VueCookies.get('id'))
                      h.noti = 'Sucessful'
                      resetNoti(h)
                      router.push('/dashboard')
                    }
                  })
                  .catch(function(e) {
                    if (e) {
                      if (e.response.status === 404) {
                        h.noti = 'Login unsucessfully'
                        resetNoti(h)
                        document.getElementById('notice').classList.add('text-danger')
                        document.getElementById('notice').classList.remove('text-success')
                      }
                    }
                  })
              }
            }
          })
      },
      signup: async function() {
        let h = this
        if (this.type === 'renter') {
          await axios.post('http://localhost:3000/api/Renter', {
            '$class': 'org.vehiclerental.Renter',
            'RenterIdentityCardNumber': this.identityNumber,
            'ownerName': this.name,
            'address': this.address,
            'phone': this.phone
          })
            .then(function(response) {
              h.noti = 'Successful'
              setTimeout(h.changeMode, 1000)
            })
            .catch(function(error) {
              if (error) {
                console.log(error)
                h.noti = 'Unsuccessful'
                resetNoti(h)
              }
            })

        } else if (this.type === 'lender') {
          await axios.post('http://localhost:3000/api/VehicleOwner', {
            '$class': 'org.vehiclerental.VehicleOwner',
            'OwnerIdentityCardNumber': this.identityNumber,
            'ownerName': this.name,
            'address': this.address,
            'phone': this.phone
          }).then(function(response) {
            this.noti = 'Successfull'
            resetNoti(h)
            setTimeout(this.changeMode, 1000)
          })
            .catch(function(error) {
              if (error) {
                h.noti = 'Unsuccessful'
                resetNoti(h)
              }
            })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
