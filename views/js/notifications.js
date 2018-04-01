$(document).ready(function () {
    var data = "";
    var url = "/newcand";

    $.getJSON(url, function (candidates) {
        data = candidates;
    });

    $(function () {
        var notificationBarHtml = "   <div class=\"notification-bar\">\n" +
            "          <div class=\"row no-gutters\">\n" +
            "            <div class=\"col\">\n" +
            "              <h4 class=\"notification-bar-header\">New candidates</h4>\n" +
            "            </div>\n" +
            "          </div>\n" +
            "\n" +
            "          <div class=\"notification-candidates-field\">\n" +
            "          </div>\n" +
            "\n" +
            "          <div class=\"row no-gutters\">\n" +
            "            <div class=\"col\">\n" +
            "              <h4 class=\"notification-bar-view-all\" id=\"view-all-candidates\">View all</h4>\n" +
            "            </div>\n" +
            "          </div>\n" +
            "\n" +
            "          <div class=\"row no-gutters\">\n" +
            "            <div class=\"col\">\n" +
            "              <h4 class=\"notification-bar-header\">Next interview</h4>\n" +
            "            </div>\n" +
            "          </div>\n" +
            "\n" +
            "          <div class=\"notification-events-field\">\n" +
            "          </div>\n" +
            "\n" +
            "          <div class=\"row no-gutters\">\n" +
            "            <div class=\"col\">\n" +
            "              <h4 class=\"notification-bar-view-all\" id=\"view-all-events\">View all</h4>\n" +
            "            </div>\n" +
            "          </div>\n" +
            "\n" +
            "        </div>";

        $(".find-bar").append(notificationBarHtml);
    });

    $(function () {
        var url = "/interview";
        $.getJSON(url, function (data) {
            console.log(data);

            $.each(data, function (key, val) {
                var eventDate = val["start"].split("T")[0];
                var eventTime = val["start"].split("T")[1];
                if (!eventTime) eventTime = "";
                else eventTime = ", " + eventTime;
                var eventHtml = "                <div class=\"row no-gutters\" data-row=\"true\">\n" +
                    "                  <div class=\"col\">\n" +
                    "                    <a href=\"#\" class=\"d-flex notification-interview-wrapper\">\n" +
                    "                      <div class=\"notification-interview-information-wrapper\">\n" +
                    "                        <div class=\"notification-interview-type\">" + val["title"] + "</div>\n" +
                    "                        <div class=\"notification-interview-time\">" + eventDate + eventTime + "</div>\n" +
                    "                      </div>\n" +
                    "                      <button type=\"button\" class=\"close delete-notification\" aria-label=\"Close\">\n" +
                    "                        <span aria-hidden=\"true\" id=\"delete-notification-button\">&times;</span>\n" +
                    "                      </button>\n" +
                    "                    </a>\n" +
                    "\n" +
                    "                  </div>\n" +
                    "              </div>";

                $(".notification-events-field").append(eventHtml);
            });

            var numberOfEvents = $(".notification-events-field").children().length;
            if (!numberOfEvents) return;

            var fieldHeight;
            if (numberOfEvents >= 3) {
                fieldHeight = $(".notification-events-field").children()[0].offsetHeight * 3 - 2;
                $(".notification-events-field").outerHeight(fieldHeight);
            } else if (numberOfEvents === 2) {
                fieldHeight = $(".notification-events-field").children()[0].offsetHeight * 2 - 2;
                $(".notification-events-field").outerHeight(fieldHeight);
            } else if (numberOfEvents === 1) {
                fieldHeight = $(".notification-events-field").children()[0].offsetHeight - 2;
                $(".notification-events-field").outerHeight(fieldHeight);
            }

            $(".notification-events-field").css('overflow-y', 'hidden');
        });
    });

    $(function () {
        $.each(data, function (key, val) {
            var statusLowerCase = val.status.toLowerCase();
            if (statusLowerCase === "new") {
                var photoId;
                if (!val.photo) {
                    photoId = "images/anounymus.png";
                } else {
                    photoId = "images/" + val.photo + ".png";
                }

                var candidateHtml = "           <div class=\"row no-gutters\" data-row=\"true>\n" +
                    "                    <div class=\"col\">\n" +
                    "                      <a href=\"../Training-team-6/id-candidate.html?id=" + val['id'] + "\" class=\"d-flex notification-candidate-wrapper\">\n" +
                    "                        <img src=\" " + photoId + "\" class=\"avatar-small\"></img>\n" +
                    "                        <div class=\"notification-candidate-information-wrapper\">\n" +
                    "                          <div class=\"notification-candidate-name\">" + val["name"] +
                    "                          </div>\n" +
                    "                          <div class=\"notification-candidate-email\">" + val["email"] +
                    "                           </div>\n" +
                    "                          <div class=\"notification-candidate-position\">" + val["position"] +
                    "                         </div>\n" +
                    "                        </div>\n" +
                    "                        <button type=\"button\" class=\"close delete-notification\" aria-label=\"Close\">\n" +
                    "                          <span aria-hidden=\"true\" id=\"delete-notification-button\">&times;</span>\n" +
                    "                        </button>\n" +
                    "                      </a>\n" +
                    "\n" +
                    "                    </div>\n" +
                    "\n" +
                    "                  </div>";
                $(".notification-candidates-field").append(candidateHtml);
            }
        })

        var numberOfCandidates = $(".notification-candidates-field").children().length;
        if (!numberOfCandidates) return;

        var fieldHeight;
        if (numberOfCandidates >= 3) {
            fieldHeight = $(".notification-candidates-field").children()[0].offsetHeight * 3 - 2;
            $(".notification-candidates-field").outerHeight(fieldHeight);
        } else if (numberOfCandidates === 2) {
            fieldHeight = $(".notification-candidates-field").children()[0].offsetHeight * 2 - 2;
            $(".notification-candidates-field").outerHeight(fieldHeight);
        } else if (numberOfCandidates === 1) {
            fieldHeight = $(".notification-candidates-field").children()[0].offsetHeight - 2;
            $(".notification-candidates-field").outerHeight(fieldHeight);
        }

        $(".notification-candidates-field").css('overflow-y', 'hidden');
    });


    var isNotificationBarVisible = false;
    $("#notification-button").click(function () {
        if (isNotificationBarVisible) {
            $(".notification-bar").css("visibility", "hidden").animate({opacity: 0}, 200);
            isNotificationBarVisible = false;
        } else {
            $(".notification-bar").css("visibility", "visible").animate({opacity: 1}, 200);
            isNotificationBarVisible = true;
        }
    });

    $("#view-all-candidates").click(function () {
            if ($(this).html() === "View all") {
                $("#view-all-candidates").html("Hide candidates");
                $(".notification-candidates-field").css('overflow-y', 'scroll');
            } else {
                $(".notification-candidates-field").scrollTop(0);
                $("#view-all-candidates").html("View all");
                $(".notification-candidates-field").css('overflow-y', 'hidden');
            }
        }
    );

    $("#view-all-events").click(function () {
            if ($(this).html() === "View all") {
                $("#view-all-events").html("Hide interviews");
                $(".notification-events-field").css('overflow-y', 'scroll');
            } else {
                $(".notification-events-field").scrollTop(0);
                $("#view-all-events").html("View all");
                $(".notification-events-field").css('overflow-y', 'hidden');
            }
        }
    );

    $(".notification-bar").click(function (event) {
        if (event.target.id === $("#delete-notification-button")[0].id) {

            var currentParent = event.target.parentElement;
            while (currentParent !== window) {
                var row = $(currentParent).attr("data-row");
                if (row) {
                    break;
                }
                currentParent = currentParent.parentElement;
            }
            $(currentParent).remove();

            var numberOfEvents = $(".notification-events-field").children().length;
            var numberOfCandidates = $(".notification-candidates-field").children().length;

            if (numberOfEvents <= 3) {
                $(".notification-events-field").css('overflow-y', 'hidden');
            }

            if (numberOfCandidates <= 3) {
                $(".notification-candidates-field").css('overflow-y', 'hidden');
            }

            var CandidatesFieldHeight = 0;
            if (!numberOfCandidates) {
                $(".notification-candidates-field").outerHeight(CandidatesFieldHeight);
            } else if (numberOfCandidates === 2) {
                CandidatesFieldHeight = $(".notification-candidates-field").children()[0].offsetHeight * 2 - 2;
                $(".notification-candidates-field").outerHeight(CandidatesFieldHeight);
            } else if (numberOfCandidates === 1) {
                CandidatesFieldHeight = $(".notification-candidates-field").children()[0].offsetHeight - 2;
                $(".notification-candidates-field").outerHeight(CandidatesFieldHeight);
            }

            var EventsFieldHeight = 0;
            if (!numberOfEvents) {
                $(".notification-events-field").outerHeight(EventsFieldHeight);
            } else if (numberOfEvents === 2) {
                EventsFieldHeight = $(".notification-events-field").children()[0].offsetHeight * 2 - 2;
                $(".notification-events-field").outerHeight(EventsFieldHeight);
            } else if (numberOfEvents === 1) {
                EventsFieldHeight = $(".notification-events-field").children()[0].offsetHeight - 2;
                $(".notification-events-field").outerHeight(EventsFieldHeight);
            }
            event.preventDefault();
        }
    });
});