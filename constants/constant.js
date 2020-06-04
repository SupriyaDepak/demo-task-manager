const CONSTANTS = {
    STATUS_CODE: {
        SUCCESS: 200,
        FAILURE: 300,
        JWT_TOKEN_EXPIRED: 499,
        INTERNAL_ERROR: 500,
        INTERNAL_SERVER_ERROR: 502,
        INTERNAL_SERVER_UIDAI_ERROR: 504,
        TIME_OUT: 599,
        API_FAILED: -999,
        API_DISABLED: 505
      },
      FEATURE_CONFIG:{
        TASK:{
          LIST:true,
          CREATE:true,
          COMMENT:false,
          CLOSE:false,
        },
        SUB_TASK:{
          LIST:true,
          CREATE:false,
          COMMENT:false,
          CLOSE:false,
        },
        LOGIN:{
          GOOGLE_SIGN_IN:true
        }
      },
      OPERTION_TYPE:{
        TASK_TYPE_SUB :"sub_task",
        TASK_CLOSE :"closed"
      }
}

module.exports = CONSTANTS;
