import functools
from datetime import datetime

time_result = """
======================================
Function Name:  {function_name}
Start time:     {start_time}
End time:       {end_time}
Process time:   {process_time}

"""


def monitor(measure):
    def time_monitor(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            start_time = datetime.now()
            func(*args, **kwargs)
            end_time = datetime.now()

            print(time_result.format(
                function_name=func.__name__,
                start_time=start_time.time(),
                end_time=end_time.time(),
                process_time=end_time - start_time,
            ))

        return wrapper

    monitor_map = dict(
        time=time_monitor,
    )

    if measure not in monitor_map.keys():
        raise AssertionError(
            f"'{measure}' is not a valid measure! "
            f"Please choose a correct measure: {list(monitor_map.keys())}"
        )

    return monitor_map[measure]
