<template>
    <div>
        <v-toolbar
            absolute
            color="teal lighten-3"
            dark
            scroll-off-screen
            >
            <v-toolbar-side-icon></v-toolbar-side-icon>

            <v-toolbar-title>Track Medium and DevTo Followers</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>favorite</v-icon>
            </v-btn>
            </v-toolbar>
        <div class="centralize">
            <v-form>
                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                required
                ></v-text-field>
                <v-text-field
                v-model="password"
                type="password"
                :rules="passwordRules"
                label="Password"
                required
                ></v-text-field>
                <v-btn
                @click="signup"
                >
                    submit
                </v-btn>
            </v-form>
            </div>
            <div class="footeR">
             <v-footer 
             height="auto"
             color="teal lighten-3"
             >
                <v-spacer></v-spacer>
                 <v-flex
                    text-xs-center
                    white--text
                    xs12
                >
                  &copy; {{ new Date().getFullYear() }}-PBABA
                </v-flex>
               
            </v-footer>
            </div>
        
    </div>
</template>

<script>
import {IMAP_MUTATION} from '../config/graphql'
export default {
    data(){
        return{
            email: null,
            password: null,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required'
            ]
        }
    },
    methods: {
        signup(){
            console.log('ok!')
            this.$apollo
                .mutate({
                    mutation: IMAP_MUTATION,
                    variables:{
                        email: this.email,
                        password: this.password
                    }
                })
                .then(response => {
                    console.log(response);
                   // this.$router.replace('/dashboard')
                })
        }
    }
}
</script>
<style>
.centralize {
    margin: 150px 180px 0px 180px;
}
.footeR{
    bottom: 0px;
    width: 100%;
    position: absolute;
}
</style>