<template>
    <div>
        <v-toolbar
            absolute
            color="teal lighten-3"
            dark
            scroll-off-screen
            >
            <v-toolbar-side-icon></v-toolbar-side-icon>

            <v-toolbar-title>Track Growth Of Medium Followers</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn v-show="responseMail" @click="logout()">LOG OUT</v-btn>
            </v-toolbar>
        <div class="centralize" v-show="!graphReady">
            <v-form
            lazy-validation
            v-model="valid"
            ref="form"
            >
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
                :disabled="!valid"
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
            <div class="centralize" v-show="graphReady">
                <h1>Hey <span class="mailStyle" v-if="responseMail">{{responseMail.email}},</span></h1>
                <div v-if="responseMail && responseMail.data.length > 0" style="margin:50px 0px 60px 0px">

                </div>
                <line-chart :chart-data="graphPoints" :options="options" />
            </div>
    <v-snackbar
      v-model="snackbar"
      left
      top
    >
      {{ msg }}
      <v-btn
        color="teal lighten-3"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    </div>
</template>

<script>
import {IMAP_MUTATION} from '../config/graphql'
import LineChart from '../config/LineChart.js'
import apolloClient from '../config/index'
import moment from 'moment'
import gql from 'graphql-tag'
export default {
    components: {
        LineChart
    },
    data(){
        return {
            valid: true,
            email: null,
            password: null,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required'
            ],
            snackbar: false,
            msg: '',
            graphReady: false,
            responseMail: null,
            options:{
                legend:{
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false,
                scales:{
                    xAxes:[{
                        gridLines:{
                            display: true,
                            lineWidth: 1,
                            drawBorder: false
                        }
                    }],
                    yAxes:[{
                        gridLines:{
                            display: true,
                            lineWidth: 3,
                            drawBorder: false
                        }
                    }]
                }
            },
            graphPoints: null

        }
    },
    methods: {
        signup(){
            if (this.$refs.form.validate()) {
                this.msg = 'Fetching results...'
                this.snackbar = true;
                this.$apollo
                    .mutate({
                        mutation: IMAP_MUTATION,
                        variables:{
                            email: this.email,
                            password: this.password
                        }
                        , fetchPolicy: 'no-cache'
                    })
                    .then(response => {
                        this.snackbar = false;
                        console.log(response);
                        this.responseMail = response.data.imapMutation;
                        this.graphReady = true;
                        return this.responseMail
                    })
                    .then(res =>{
                        this.plotGraph()
                        const cacheResponse = localStorage.setItem('cacheResponse', JSON.stringify(res))
                    })
                    .catch(e =>{
                        console.log(e)
                        
                        this.msg = e.message;
                    })
            }
            
        },
        plotGraph(){
            this.graphPoints = {
                labels:[],
                datasets: [
                    {
                        label: 'Medium followers',
                        borderColor: 'green',
                        fill:false,
                        lintTension: 0,
                        pointBackgroundColor: 'red',
                        data:[]
                    }
                ]
            }
            if(this.responseMail){  
                this.responseMail.data.map(point =>{
                    this.graphPoints.labels.push(this.formatDate(point.date.split('T')[0]))
                    this.graphPoints.datasets[0].data.push(point.numberOfFollowers)
                    console.log(this.graphPoints)
                })
            }
        },
        formatDate(date){
            return moment(date, 'YYYY-MM-DD').format('Do MMM YY')
        },
        logout(){
            localStorage.removeItem('cacheResponse')
            this.$router.go('/');
        }
    },
    created(){
        if(window.localStorage.getItem('cacheResponse')) {
            this.graphReady = true;
            this.responseMail = JSON.parse(localStorage.getItem('cacheResponse'));
            this.plotGraph()
            
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
.mailStyle{
    color: red;
    font-style: italic;
}
</style>