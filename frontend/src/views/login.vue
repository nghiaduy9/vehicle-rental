<template>
  <div class="container w-25 mx-auto my-5">
    <div v-if="loginMode">
      <div class="card">
        <h4 class="card-header text-center">Sign In</h4>
        <div class="card-body">
          <span class="text-success text-center" id="notice">{{noti}}</span>
          <form @submit.prevent="login">
            <div class="form-group">
              <input
                class="form-control"
                placeholder="Identity card number"
                type="number"
                v-model="identityNumber"
              >
            </div>
            <div class="form-group">
              <input class="form-control" placeholder="Password" type="password">
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">Sign in</button>
            </div>
            <span class="btn-link" @click="changeMode">Not have account? Sign up now</span>
          </form>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card">
        <h4 class="card-header text-center">Sign Up</h4>
        <div class="card-body">
          <span class="text-success text-center">{{noti}}</span>
          <form @submit.prevent="signup">
            <div class="form-group d-flex justify-content-between">
              <span>Account type:</span>
              <div>
                <input type="radio" value="renter" checked v-model="type">
                <label class="radio-inline ml-1 mr-2">Renter</label>
                <input type="radio" value="lender" v-model="type">
                <label class="radio-inline ml-1">Lender</label>
              </div>
            </div>
            <div class="form-group">
              <input
                class="form-control"
                placeholder="Identity card number"
                type="number"
                v-model="identityNumber"
              >
            </div>
            <div class="form-group">
              <input class="form-control" placeholder="Password" type="password">
            </div>
            <div class="form-group">
              <input class="form-control" placeholder="Full name" type="text" v-model="name">
            </div>
            <div class="form-group">
              <input class="form-control" placeholder="Address" type="text" v-model="address">
            </div>
            <div class="form-group">
              <input class="form-control" placeholder="Phone number" type="number" v-model="phone">
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">Sign up</button>
            </div>
            <span class="btn-link" @click="changeMode">Have account? Sign in now</span>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '../router.js'

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
    login: function() {
      const h = this
      document.getElementById('notice').classList.add('text-success')
      document.getElementById('notice').classList.remove('text-danger')
      axios
        .get('http://localhost:3000/api/Renter/' + this.identityNumber)
        .then(function(response) {
          if (response.status === 200) {
            VueCookies.set('account-type', 'renter')
            VueCookies.set('id', h.identityNumber)
            h.noti = 'Successful'
            resetNoti(h)
            router.push('/dashboard')
          }
        })
        .catch(function(error) {
          console.log(error)
          if (error) {
            if (error.response.status === 404) {
              axios
                .get('http://localhost:3000/api/VehicleOwner/' + h.identityNumber)
                .then(function(r) {
                  if (r.status === 200) {
                    VueCookies.set('account-type', 'lender')
                    VueCookies.set('id', h.identityNumber)
                    h.noti = 'Successful'
                    resetNoti(h)
                    router.push('/dashboard')
                  }
                })
                .catch(function(e) {
                  if (e) {
                    if (e.response.status === 404) {
                      h.noti = 'Login unSuccessfully'
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
    signup: function() {
      let h = this
      if (this.type === 'renter') {
        axios
          .post('http://localhost:3000/api/Renter', {
            $class: 'org.vehiclerental.Renter',
            RenterIdentityCardNumber: this.identityNumber,
            name: this.name,
            address: this.address,
            phone: this.phone
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
        axios
          .post('http://localhost:3000/api/VehicleOwner', {
            $class: 'org.vehiclerental.VehicleOwner',
            OwnerIdentityCardNumber: this.identityNumber,
            name: this.name,
            address: this.address,
            phone: this.phone
          })
          .then(function(response) {
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

<style scoped>
.btn-link {
  cursor: pointer;
}
</style>
