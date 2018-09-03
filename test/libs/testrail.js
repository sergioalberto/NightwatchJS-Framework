/**
 * @description Class to send results on Testrail tool
 * @author Sergio Gonzalez Q <sergioalbertogq@gmail.com>
 * @source https://www.npmjs.com/package/node-testrail
 *         https://www.npmjs.com/package/node-testrail-sync
 * @place Cartago, Costa Rica
 * @date Aug 2018
 */

const TestRail = require('node-testrail-sync');

module.exports = class Testrail {
  constructor(server, username, password) {
    this.testrail = new TestRail(server, username, password);
  }

  // #################### User ###################################

  getUserByEmail(email, verbose = true) {
    const result = this.testrail.getUserByEmail(email);
    if (verbose) {
      console.log('User: ');
      console.log(result);
    }
    return result;
  }

  // #################### Tests ###################################

  getTest(testID, verbose = true) {
    const result = this.testrail.getTest(testID);
    if (verbose) {
      console.log('Test: ');
      console.log(result);
    }
    return result;
  }

  // #################### Cases ###################################

  getCase(case_id, verbose = true) {
    const result = this.testrail.getCase(case_id);
    if (verbose) {
      console.log('Test Case: ');
      console.log(result);
    }
    return result;
  }

  // #################### Milestones ###################################

  getMilestones(project_id, verbose = true) {
    const result = this.testrail.getMilestones(project_id);
    if (verbose) {
      console.log('Milestones: ');
      console.log(result);
    }
    return result;
  }

  // #################### Projects ###################################

  getProjects(verbose = true) {
    const result = this.testrail.getProjects();
    if (verbose) {
      console.log('Projects: ');
      console.log(result);
    }
    return result;
  }

  addProject(name, announcement = '', show_announcement = '', verbose = true) {
    const result = this.testrail.addProject(name, announcement, show_announcement);
    if (verbose) {
      console.log('Project: ');
      console.log(result);
    }
    return result;
  }

  // #################### Test Plans ###################################

  getPlan(plan_id, verbose = true) {
    const result = this.testrail.getPlan(plan_id);
    if (verbose) {
      console.log('Testplan: ');
      console.log(result);
    }
    return result;
  }

  addPlan(name, description, project_id, milestone_id, verbose = true) {
    const result = this.testrail.addPlan(project_id, name, description, milestone_id);
    if (verbose) {
      console.log('Testplan: ');
      console.log(result);
    }
    return result;
  }

  // Assign a suite to a test plan
  addPlanEntry(plan_id, suite_id, name, assignedto_id, include_all, verbose = true) {
    const result = this.testrail.addPlanEntry(plan_id, suite_id, name, assignedto_id, include_all);
    if (verbose) {
      console.log('Entry Testplan: ');
      console.log(result);
    }
    return result;
  }

  // #################### Sections ###################################

  getSections(project_id, suite_id, verbose = true) {
    const result = this.testrail.getSections(project_id, suite_id);
    if (verbose) {
      console.log('Sections: ');
      console.log(result);
    }
    return result;
  }

  // #################### Suites ###################################

  getSuites(project_id, verbose = true) {
    const result = this.testrail.getSuites(project_id);
    if (verbose) {
      console.log('Suites: ');
      console.log(result);
    }
    return result;
  }

  // #################### Runs ###################################

  getRuns(project_id, verbose = true) {
    const result = this.testrail.getRuns(project_id);
    if (verbose) {
      console.log('Runs: ');
      console.log(result);
    }
    return result;
  }

  addRun(project_id, suite_id, milestone_id, name, description, verbose = true) {
    const result = this.testrail.addRun(project_id, suite_id, name, description, milestone_id);
    if (verbose) {
      console.log('Runs: ');
      console.log(result);
    }
    return result;
  }

  // #################### Results ###################################

  getResults(test_id, limit = 10, verbose = true) {
    let result = null;
    result = this.testrail.getResults(test_id, (myResult) => {
      result = myResult;

      if (verbose) {
        console.log('Test result: ');
        console.log(result);
      }
    }, limit);

    return result;
  }

  getResultsForCase(run_id, case_id, limit = 5, verbose = true) {
    const result = this.testrail.getResultsForCase(run_id, case_id, limit);
    if (verbose) {
      console.log('Case result: ');
      console.log(result);
    }
    return result;
  }

  addResult(test_id, status_id, assignedto_id, comment, version, elapsed, defects, verbose = true) {
    const result = this.testrail.addResult(test_id, status_id, comment, version, elapsed, defects, assignedto_id);
    if (verbose) {
      console.log('Result: ');
      console.log(result);
    }
    return result;
  }

  addResultForCase(run_id, case_id, status_id, assignedto_id, comment, version, elapsed, defects, verbose = true) {
    const result = this.testrail.addResultForCase(run_id, case_id, status_id, comment, version, elapsed, defects, assignedto_id);
    if (verbose) {
      console.log('ResultForCase: ');
      console.log(result);
    }
    return result;
  }
};

// const testrail = new Testrail('http://localhost/testrail/', '', '');
// testrail.getUserByEmail('s@g.com');
// testrail.getTest("28149");
// testrail.getCase("1989");
// testrail.getProjects();
// testrail.getMilestones("2");
// testrail.getSuites("2");
// testrail.getSections("2", "147");
// testrail.getPlan("14206");
// testrail.addPlan('TestNW', 'Just testing ...', '2', '');
// testrail.addPlanEntry("14278", "151", "Testing", "", "");
// testrail.getRuns("2");
// testrail.addRun("2", "147", "", "Testing Suite from NW", "");
// testrail.getResults("28149");
// testrail.getResultsForCase("157", "1989");
// testrail.addResultForCase("14280", "4561767", "1", "73", "Passing", "", "", "");


// Create a test plan
// 14435 <= testrail.addPlan('TestNW', 'Just testing ...', '2', '');
// Create a test run
// 14436 <= testrail.addPlanEntry("14435", "2", "Testing", "", "");
// Update a test result
// testrail.addResultForCase("14436", "1671", "1", "73", "Passing", "", "", "");
