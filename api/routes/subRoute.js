module.exports = function (app) {
    let sub = require("../controllers/subController");

    app.route('/sub')
        .get(sub.get_all_sub_contents);

    app.route('/sub/:subid')
        .get(sub.get_sub_content_by_name);

    app.route('/sub_link')
        .get(sub.get_all_subs_link)
        .post(sub.add_sub_link);

    app.route('/sub_link/:subid')
        .get(sub.get_sub_link_by_name)
        .put(sub.modify_sub_link_by_name)
        .delete(sub.delete_sub_link_by_name)

};