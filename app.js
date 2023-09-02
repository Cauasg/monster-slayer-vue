const randomNum = (max, min) => Math.floor(Math.random() * (max - min) + min)

Vue.createApp({
    data() {
        return {
            monsterHealth : 25,
            playerHealth : 25,
            round : 0,
            mana : 3,
            winner : null,
            battleLog : []
        };
    },
    watch : {
        playerHealth(val){
            if (val <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw'
                this.playerHealth = 0;
            }else if (val <= 0){
                this.playerHealth = 0;
                this.winner = 'monster'
            } else if(val >= 25){
                this.playerHealth = 25
            }
        },
        monsterHealth(val){
            if (val <= 0 && this.playerHealth <= 0){
                this.winner = 'draw'
                this.monsterHealth = 0;
            } else if (val <= 0){
                this.monsterHealth = 0;
                this.winner = 'player'
            }
        },
        
        mana(val){
            if (val > 3){
                this.mana = 3
            }
        }
    },
    computed : {
        playerLifeBar(){
            return {width : `${this.playerHealth * 100 / 25}% !important`};
        },
        monsterLifeBar(){
            return {width : `${this.monsterHealth * 100 / 25}% !important`};
        },
        specialAvailable(){
            return this.mana !== 3;
        }
    },
    methods: {
        addLog(who, what, value){
            this.battleLog.unshift({
                action : who,
                actionType : what,
                actionVal : value
            })
        },
        monsterAttack(){
            const damage = randomNum(6,3);
            this.addLog('monster', 'attack', damage)
            return damage;
        },
        endRound(mana = true){
            this.playerHealth -= this.monsterAttack();
            this.round++;
            
            if (mana) this.mana++;
        },
        attack(){
            const damage = randomNum(4,1);
            this.monsterHealth -= damage;
            this.addLog('player', 'attack', damage)
            this.endRound();
        },
        specialAtk(){
            this.mana = 0;
            const damage = randomNum(6,3)
            this.monsterHealth -= damage;
            this.addLog('player', 'attack', damage)
            this.endRound(false);
        },
        heal(){
            healVal = randomNum(9, 3);
            this.playerHealth += healVal;
            this.addLog('player', 'heal', healVal)
            this.endRound();
        },
        surrender(){
            this.winner = 'monster'
        },
        restart(){
            this.monsterHealth = 25;
            this.playerHealth = 25;
            this.round = 0;
            this.mana = 3;
            this.winner = null;
            this.battleLog.splice(0, this.battleLog.length);
        },
        
    },
}).mount('#game');