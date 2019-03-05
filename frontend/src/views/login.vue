<template>
  <div>
    <TopBar/>
    <div class="container w-25 mx-auto my-5">
      <div class="card">
        <div class="card-body">
          <nav class="nav nav-tabs nav-justified mb-3">
            <a class="nav-link active" data-toggle="tab" href="#sign-up">
              <h5 class="mb-0">SIGN UP</h5>
            </a>
            <a class="nav-link" data-toggle="tab" href="#sign-in">
              <h5 class="mb-0">SIGN IN</h5>
            </a>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="sign-up">
              <SignUpForm/>
            </div>
            <div class="tab-pane fade" id="sign-in">
              <SignInForm/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/top-bar'
import SignInForm from '../components/sign-in-form'
import SignUpForm from '../components/sign-up-form'

export default {
  name: 'Login',
  components: { TopBar, SignInForm, SignUpForm }
}
</script>
