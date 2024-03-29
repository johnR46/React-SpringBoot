var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
var index = 1;
var MyPage = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      Symptom: '',
      Hospital: '',
      Ambalance: '',
      Doctor: '',
      diagnose: '',
      search: ' ',


      vegetables: [
        1
      ],
      selectedVegetable: 'Onion',
      todo: []

    };
  },

  renderToolbar: function (route, navigator) {

    const backButton = route.hasBackButton
      ? <Ons.BackButton onClick={this.handleClick.bind(this, navigator)}>Back</Ons.BackButton>
      : null;
    return (
      <Ons.Toolbar>
        <div className='left'>{backButton}</div>
        <div className='center'>{route.title}</div>
      </Ons.Toolbar>

    );



  },

  handleClick: function (navigator) {
    ons.notification.confirm('Do you really want to go back?')
      .then((response) => {
        if (response === 1) {
          navigator.popPage();
          index =1;
        }

      });
  },


  componentDidMount() {
    let todo = []

    console.log("Hi React");
    var that = this;
    var url = 'http://localhost:8080/api/patients/'
    var url2 ='http://localhost:8080/api/doctors/'
    var url3 ='http://localhost:8080/api/ambulances/'
    var url4 ='http://localhost:8080/api/hospitals/'
    fetch(url)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        // that.setState({ person: data.person });
        console.log(data._embedded.patients)
        todo = data._embedded.patients
        that.setState({ todo })
        todo.map((d, idx) => {
          that.setState({ username: d.name })
          that.setState({ Symptom: d.symptom })
        })

      });
      fetch(url2)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        // that.setState({ person: data.person });
        console.log(data._embedded.doctors)
        todo = data._embedded.doctors
        that.setState({ todo })
        todo.map((d,idx) => {
          that.setState({Doctor:d.name })
         
          })

      });
      fetch(url3)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        // that.setState({ person: data.person });
        console.log(data._embedded.ambulances)
        todo = data._embedded.ambulances
        that.setState({ todo })
        todo.map((d,idx) => {
          that.setState({Ambalance:d.aname})
          
          })

      });
      fetch(url4)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        // that.setState({ person: data.person });
        console.log(data._embedded.hospitals)
        todo = data._embedded.hospitals
        that.setState({ todo })
        todo.map((d,idx) => {
          that.setState({Hospital:d.hname})
          
          })

      });
      


  },





  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  },
  handleDoctorChange(e) {
    this.setState({ Doctor: e.target.value });
  },
  handlediagnoseChange(e) {
    this.setState({ diagnose: e.target.value.trim() });

  },

  handleSearchChange(e) {
    this.setState({ search: e.target.value.trim() });
  },


  handleVegetableChange(vegetable) {
    this.setState({ selectedVegetable: vegetable });
  },

  pushPage: function (navigator) {
    navigator.pushPage({
      title: `ผลการค้นหา `,
      hasBackButton: true


    });

    index++;
  },

  





  renderPage: function (route, navigator) {
    this.componentDidMount
        if (index == 1) {
     
          return (
            <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
              <section style={{ textAlign: 'center' }}>
                <p>
                  <Ons.SearchInput
                    value={this.state.search}
                    onChange={this.handleSearchChange}
                    float
                    placeholder='Search' />

                </p>
                <p>
                </p>
              </section>
              <section style={{ margin: '16px', textAlign: 'center' }}>
                <Ons.Button onClick={this.pushPage.bind(this, navigator)}>Next</Ons.Button>
              </section>
            </Ons.Page>
          );

        }
    else if (index === 2 && this.state.username===this.state.search) {
       console.log(index)
        return (
          <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
            <Ons.ListItem>ชื่อคนไข้ :{this.state.username}</Ons.ListItem>
            <Ons.ListItem>อาการป่วย : {this.state.Symptom}</Ons.ListItem>
            <Ons.ListItem> หมอที่ดูแล :{this.state.Doctor} </Ons.ListItem>
            <Ons.ListItem>
              <div className='center'>
                วินิจฉัยอาการ :
                <Ons.Input
                  value={this.state.diagnose}
                  onChange={this.handlediagnoseChange}
                  modifier='underbar'
                  float
                  placeholder='กรุณากรอกข้อมุล' />
               </div>

            </Ons.ListItem>
            <section style={{ margin: '16px', textAlign: 'center' }}>
              <Ons.Button onClick={this.handleClick_SAVE}>Save</Ons.Button>
            </section>

            <section style={{ margin: '16px', textAlign: 'center' }}>
              <Ons.Button onClick={this.pushPage.bind(this, navigator)}> ดูใบบันทึกการส่งตัว </Ons.Button>
            </section>
          </Ons.Page>

        );
      
    }
    else if(this.state.username!=this.state.search){
       console.log(index)
        return (

          <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
            <Ons.ListItem>ไม่มีคนไข้ :{this.state.search}: ในระบบ</Ons.ListItem>
            <section style={{ margin: '16px', textAlign: 'center' }}>
              <Ons.BackButton onClick={this.handleClick.bind(this, navigator)}>Back</Ons.BackButton>
            </section>
          </Ons.Page>

        );
      3
    }
     else if (index ===3) {
      console.log(index)


      return (<Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>

        <Ons.ListItem>ชื่อคนไข้ :{this.state.username}</Ons.ListItem>
        <Ons.ListItem>อาการป่วย:{this.state.Symptom} </Ons.ListItem>
        <Ons.ListItem>ผลการวินิจฉัย:{this.state.diagnose} </Ons.ListItem>
        <Ons.ListItem>หมอที่ดูแล:{this.state.Doctor} </Ons.ListItem>
        <Ons.ListItem>รถพยาบาลนำส่ง:{this.state.Ambalance} </Ons.ListItem>
        <Ons.ListItem>โรงพยาบาล:{this.state.Hospital} </Ons.ListItem>
      </Ons.Page>
      );



    }

  },

  handleClick_SAVE() {
    if (this.state.diagnose) {
      // ons.notification.alert('Save')
      client({ method: 'GET', path: '/vote/' + 1 + '/point/' + `${this.state.diagnose}` }).done(
        ons.notification.alert('SAVE Done')
      )



    } else {
      ons.notification.alert('Data is null pls try Again ><')
    }

  },



  render: function () {
    return (
      <Ons.Navigator
        swipeable
        renderPage={this.renderPage}
        initialRoute={{
          title: 'History Patient',
          hasBackButton: false

        }}
      />
    );
  }
});
ReactDOM.render(<MyPage />, document.getElementById('react'));