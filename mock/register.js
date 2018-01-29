const institutionList = {
    "code": 0,
    "msg": "ok",
    "data": [
        {
            "manageId": "1f27c1d8131a4096bd1e659f9cce94e2",
            "institutionId": "8a411da788c24402a39a7826aae26b8e",
            "manageName": "海通证券",
            "city": "深圳",
            "sublInstitution": null,
            "contacts": "陈秋燕",
            "contactPhone": "15999646203",
            "startStatus": null,
            "manageLogoId": null,
            "createTime": 1516254564935,
            "approvalStatus": null,
            "cityCode": "1",
            "institutionCode": "2"
        },
        {
            "manageId": "40f05aeb7ef247da8d00e08d5b317cab",
            "institutionId": "04d54b7a25f0473f9679096cfab7597c",
            "manageName": "华夏银行",
            "city": "深圳",
            "sublInstitution": null,
            "contacts": "陈秋燕",
            "contactPhone": "15355498056",
            "startStatus": null,
            "manageLogoId": null,
            "createTime": 1516254570936,
            "approvalStatus": null,
            "cityCode": "1",
            "institutionCode": "1"
        },
        {
            "manageId": "5a840b4f457543beaf267b7b39024dd7",
            "institutionId": null,
            "manageName": "天风证券",
            "city": "深圳",
            "sublInstitution": null,
            "contacts": null,
            "contactPhone": null,
            "startStatus": 0,
            "manageLogoId": null,
            "createTime": 1516253793935,
            "approvalStatus": null,
            "cityCode": "1",
            "institutionCode": "2"
        },
        {
            "manageId": "5e553724754f4d47b57c45ff6afd53d6",
            "institutionId": "04d54b7a25f0473f9679096cfab7597c",
            "manageName": "平安银行",
            "city": "深圳",
            "sublInstitution": null,
            "contacts": "王日梅",
            "contactPhone": "15999646232",
            "startStatus": null,
            "manageLogoId": null,
            "createTime": 1516254505835,
            "approvalStatus": null,
            "cityCode": "1",
            "institutionCode": "1"
        }
    ]
}
const subInstitutionList = {
    "code": 0,
    "msg": "ok",
    "data": [
        {
            "manageId": "2890c98fa9474bf1ac8ecb282357fc28",
            "institutionId": "04d54b7a25f0473f9679096cfab7597c",
            "manageName": "平安南山分行",
            "city": "深圳",
            "sublInstitution": "5e553724754f4d47b57c45ff6afd53d6",
            "contacts": "陈秋燕",
            "contactPhone": "15999646203",
            "startStatus": null,
            "manageLogoId": null,
            "createTime": 1516254568440,
            "approvalStatus": null,
            "cityCode": "1",
            "institutionCode": "1"
        },
        {
            "manageId": "4269f2e11e144ff5a57dfbe674cfecd9",
            "institutionId": "04d54b7a25f0473f9679096cfab7597c",
            "manageName": "平安福田分行",
            "city": "深圳",
            "sublInstitution": "5e553724754f4d47b57c45ff6afd53d6",
            "contacts": "陈成邦5",
            "contactPhone": "15999646203",
            "startStatus": 0,
            "manageLogoId": null,
            "createTime": 1516257944994,
            "approvalStatus": null,
            "cityCode": "1",
            "institutionCode": "1"
        }
    ]
}
export function getInstitution(req, res, u, b) {
  const result = institutionList;

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getSubInstitution(req, res, u, b) {
  const result = subInstitutionList;

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function queryAllInstitution(req, res) {
  res.send({
      "code": 0,
      "msg": "ok",
      "data": [
          {
              "institutionId": "04d54b7a25f0473f9679096cfab7597c",
              "institutionName": "银行",
              "createUserId": "admin",
              "createTime": 1516184455966,
              "institutionCode": "1"
          },
          {
              "institutionId": "8a411da788c24402a39a7826aae26b8e",
              "institutionName": "金融机构",
              "createUserId": "admin",
              "createTime": 1516186974926,
              "institutionCode": "2"
          },
          {
              "institutionId": "6015ed04cf524ff6a043443a03a87185",
              "institutionName": "小额贷款",
              "createUserId": "admin",
              "createTime": 1516187373343,
              "institutionCode": "3"
          }
      ]
  });
}
export default { getInstitution, getSubInstitution, queryAllInstitution };
