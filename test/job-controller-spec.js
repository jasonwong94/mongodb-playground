describe('JobController', function(){

  beforeEach( module('database') );

  var sampleJobList = [
    {'_id': 1, 'Title': 'Software Developer', 'Company': 'Google', 'Status': 'Application Created' },
    {'_id': 2, 'Title': 'Front-end Developer', 'Company': 'Desire2Learn', 'Status': 'Application Created'},
    {'_id': 3, 'Title': 'Back-end Developer', 'Company':'phpLabs', 'Status': 'Interview'},
    {'_id': 4, 'Title': 'Embedded Developer', 'Company':'RoboticsABC', 'Status': 'Interview'},
    {'_id': 5, 'Title': 'C# Developer', 'Company': 'ASPnet', 'Status': 'Rejected'},
    {'_id': 6, 'Title': 'Android Developer', 'Company':'AndroidDevs', 'Status': 'Offered'}]
  var JobController, scope;

  beforeEach( inject(
    function( $rootScope, $controller ) {
      scope = $rootScope.$new();
      JobController = $controller('JobController', {
        $scope: scope
      })

      JobController.JobLists = sampleJobList;
    })
  );

  describe('initializeJob()', function(){
    it('initializes the controller with a list of jobs', function(){
      JobController.JobLists = undefined;

      JobController.initializeJob( sampleJobList );
      expect( JobController.JobLists ).toEqual( sampleJobList );
    })
  })

  describe('editJob()', function(){
    xit('succesfully sets the JobDetail object if the job is found', function(){
      var sampleJob = sampleJobList[0];
      var sampleJobID = sampleJob._id;
      console.log( JobController.JobLists )
      JobController.editJob( sampleJobID );
      expect( JobController.JobDetail ).toEqual( sampleJob );
    })
  })

  describe('resetJobDetail()', function(){
    it('clears out the existing object', function(){
      JobController.JobDetail = sampleJobList[0];

      JobController.resetJobDetail();
      expect( JobController.JobDetail ).toEqual( {} );
      expect( JobController.AddNewJob ).toEqual( false );
    })
  })
})
