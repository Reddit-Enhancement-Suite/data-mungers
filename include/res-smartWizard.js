$(document).ready(function(){
    // Smart Wizard
    $('#wizard').smartWizard({
        onLeaveStep: onLeaveStep,
        includeFinishButton: false
    });

    function onLeaveStep(obj){
        var stage = obj.attr('rel');
        var handler = leaveStepHandlers[stage];
        var result = true;
        if (handler) {
            try {
                result = handler();
            } catch (e) {
                result = 'There was a problem: ' + e.toString();
            }
        }
        if (result !== true) {
            alert(result || 'You\'re not done with this step yet.');
            return false;
        }
        return true;
    }

    var leaveStepHandlers = {};
    leaveStepHandlers[window.backupStage || 1] = function() {
        if (!$('#backup').prop('checked')) {
            return 'After you back up your settings, tick the checkbox indicating settings are backed up.';
        }
        return true;
    };

    leaveStepHandlers[window.mungeStage || 2] = function() {
        var source = document.querySelector('#source').value;
        if (!source) {
            return 'Put the data in the text box.';
        }
        var result = munge(source);
        document.querySelector('#result').value = result;
        return true;
    }

    $('#wizard').on('focus', '[data-select-all]', function(e) {
        var text = e.target;
        text.setSelectionRange(0, text.value.length);
    });
});
