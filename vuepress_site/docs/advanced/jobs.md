
# Jobs

The Cron Service maintains a library of singleton Jobs that can be set up to 
run according to a certain schedule. The Cron Service is not something you
should need to access directly in your application and it is configured by the 
file `config/cron.js`.

[[toc]]

## Activating the Cron Service

To turn the Cron Service on (so that it actually schedules Jobs), the 
`isActive` property of `config/cron.js` needs to be set to `true`. This makes 
it easy to toggle the Service's functionality. The other property in 
`config/cron.js` is `schedule`, which is a list of configurations for 
when recurring Jobs should be run. Details for this are described below.

## Job Classes

Job classes define a certain action.

You can generate a new Job class using the CLI:

```
node . generate job MyCustomJob
```

This would create the file
`site/cron/jobs/my-custom-job.js`.

A Job class should look like this:

```javascript
class MyCustomJob extends BaseJob {
  constructor() {
    super();
  }
  async handle(args) {
    
    // do stuff
    
    return {
      success: true,
      message: "This is some information."
    };
  }
}

exports = module.exports = MyCustomJob;
```

You can do what you want to in the `handle` method. The `args` object will be
provided in your configuration for the Cron Service. The `handle` method must 
return an object with both the properties `success` (a boolean) and `message`
(a string). Results will be logged using the Logger Service with "Cron" as the 
source and the returned message as the log message. If the `success` value 
of the return object is `false`, the log will be at ERROR level. If `true`,
the log will be at VERBOSE level.

## Schedule Classes

Schedule classes are used to determine when Jobs should run, coupled with
configuration objects. You may not need to write your own 

You can generate a new schedule using the CLI:

```
node . generate schedule my-custom-schedule
```

This would create the file
`site/cron/schedules/my-custom-schedule.js`.

There are two methods to define, `shouldRunOnStart` and `nextRunTime`. 
Both are passed the current time and the configuration defined 
for the scheduled job. The first should return true or false based on whether
the Job should run at the beginning of the server starting up. The second 
method should return a [moment](https://www.npmjs.com/package/moment)
time object.

## Using the Cron Service

The Cron Service is automatically started with the `runserver` command, 
if `isActive` is set to `true` in `config/cron.js`. The first check will run
after 30 seconds, and every 30 seconds thereafter.

### Invoking Terminal Commands

Often, you may want to invoke a Terminal Command from a Job. This is done
in the included Job `ClearTmpJob` which clears the `.tmp/` directory of all 
files more than X number of hours old:

```javascript
async handle(args) {
    
  let TerminalSvc = Carolina.$('Terminal');
  let ClearTmpCommand = TerminalSvc._command('ClearTmpCommand');
  
  // call the Command, passing in args
  let r = await ClearTmpCommand.handle({ hours: args.hours });
  
  return {
    success: true,
    message: `Files in .tmp/ that were more than ${args.hours} hours old have been deleted.`
  };
}
```

### Cron Configuration

A Cron Service schedule is defined in `config/cron.js` and looks like this:

```javascript
// when to run jobs
schedule: {
  'clearTmpDaily': {
    job: 'ClearTmpJob',
    args: { hours: 24 },
    when: {
      schedule: 'MinuteSchedule',
      conf: { every: 5 }
    }
  } 
}
```

The `schedule` property is a map of custom Cron Job names to objects describing
the Job and Schedule. The `job` property references the Job to run.
The `args` property is the object that will be passed into the `handle` 
method of the Job. The `when` property is an object. The `schedule` property
of `when` names the Schedule, and the `conf` property of `when` is the config
object that will be passed in the calls to methods of the Schedule. The above
configuration instructs the `ClearTmpJob` to run to delete all `.tmp/` files
older than 24 hours old every 5 minutes.

### Scheduling Options

There are several included Schedules, and below are some common use cases
for them (all are example `when` objects).

```javascript

// run every minute
when: { schedule: 'MinuteSchedule' }

// run every 5 minutes
when: { schedule: 'MinuteSchedule', args: { every: 5 } }

// run every 10 minutes
when: { schedule: 'MinuteSchedule', args: { every: 10 } }

// run every 30 minutes
when: { schedule: 'MinuteSchedule', args: { every: 30 } }

// run every hour on the hour
when: { schedule: 'HourSchedule' }

// run on the 20 minute mark of every hour
when: { schedule: 'HourSchedule', args: { minute: 20 } }

// run every 3 hours on the 10 minute mark
when: { schedule: 'HourSchedule', args: { every: 3, minute: 20 } }

// run every day at midnight
when: { schedule: 'DaySchedule' }

// run every day at 2:30 pm
when: { schedule: 'DaySchedule', args: { hour: 14, minute: 30 } }

// run every week at midnight Sunday
when: { schedule: 'WeekSchedule' }

// run every week on Tuesday at 8:20 am
when: { schedule: 'WeekSchedule', args: { day: 2, hour: 8, minute: 20 } }

// run at midnight on the first day of every month
when: { schedule: 'MonthSchedule' }

// run on 4th day of every month at 11:25 am
when: { schedule: 'MonthSchedule', args: { day: 4, hour: 11, minute: 25 } }
```

::: tip
Note that all schedules are approximate. A thing to run every minute may 
run as close as 30 seconds apart sometimes and up to 2 minutes apart.
Also note that if the application is started and then stopped for a while,
when it is started again any task that's next run has past will be started
within
the first minute.
:::

## Automatic Logs

After every Job is complete, the Cron Service creates a log entry using the 
[Logger Service](/docs/basics/logging.md). The source of the log will be
"CRON" and the message will be the message returned by the Job. If the Job 
was successful, the level will be VERBOSE, otherwise the level will be 
ERROR.