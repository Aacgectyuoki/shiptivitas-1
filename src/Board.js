import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients().map(client => ({ ...client, status: 'backlog' }));
    this.state = {
      clients: {
        backlog: clients,  // All tasks initially in backlog
        inProgress: [],
        complete: []
      }
    };
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef()
    };
  }

  componentDidMount() {
    const containers = [
      this.swimlanes.backlog.current,
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current
    ];
  
    const drake = Dragula(containers, {
      moves: (el, source, handle, sibling) => {
        return el.classList.contains('Card');
      }
    });
  
    drake.on('drop', (el, target, source, sibling) => {
      const clientId = el.getAttribute('data-id');
      const newStatus = target.getAttribute('data-status');
      this.updateClientStatus(clientId, newStatus);
    });
  }

  updateClientStatus(clientId, newStatus) {
    if (!newStatus) {
      console.error(`Invalid swimlane status: ${newStatus}`);
      return;
    }
  
    this.setState(prevState => {
      const clients = { ...prevState.clients };
      let client;
  
      // Remove client from previous status
      for (const status in clients) {
        const index = clients[status].findIndex(c => c.id === clientId);
        if (index !== -1) {
          client = clients[status].splice(index, 1)[0];
          break;
        }
      }
  
      // Verify if the target swimlane exists and then update the client status
      if (client && clients[newStatus]) {
        client.status = newStatus;
        clients[newStatus].push(client);
      } else {
        console.error(`Swimlane "${newStatus}" does not exist or client is undefined`);
      }
  
      return { clients };
    });
  }

  getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'in-progress'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'complete'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'in-progress'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'in-progress'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'complete'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'complete'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'in-progress'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'in-progress'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'complete'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }
  renderSwimlane(name, clients, ref, status) {
    return (
      <Swimlane name={name} clients={clients} dragulaRef={ref} data-status={status} />
    );
  }

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane('Backlog', this.state.clients.backlog, this.swimlanes.backlog, 'backlog')}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('In Progress', this.state.clients.inProgress, this.swimlanes.inProgress, 'in-progress')}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('Complete', this.state.clients.complete, this.swimlanes.complete, 'complete')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}